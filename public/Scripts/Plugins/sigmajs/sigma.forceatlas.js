/**
 * LINKURIOUS CONFIDENTIAL
 * __________________
 * 
 *  [2012] - [2013] Linkurious SAS 
 *  All Rights Reserved.
 *  Sébastien Heymann <seb@linkurio.us>,
 *  Romain Yon <romain@linkurio.us>
 * 
 * NOTICE:  All information contained herein is, and remains
 * the property of Linkurious SAS and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Linkurious SAS
 * and its suppliers and may be covered by French and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Linkurious SAS.
 *
 * 
 * Please use http://jsbeautifier.org/ and indent with 2 spaces.
 *
 * Lib docs:
 * http://twitter.github.com/bootstrap/
 * http://docs.jquery.com/
 * http://addyosmani.github.com/jquery-ui-bootstrap/
 * http://sigmajs.org/ + well documented source code
 */;
sigma.forceatlas = sigma.forceatlas || {};

sigma.forceatlas.ForceAtlas = function (graph, fixedNodes) {
  sigma.classes.Cascade.call(this);
  var self = this;
  this.graph = graph;
  this.stop = false;

  var nbNodes;
  var oldAvgDist = Number.POSITIVE_INFINITY;

  var defaultSpeed = 1;
  this.p = {
    inertia: 0.15,
    repulsionStrength: 15,//15
    attractionStrength: 4,//4
    maxDisplacement: 4,
    freezeBalance: true,
    freezeStrength: 80,
    freezeInertia: 0.2,
    gravity: 30,
    speed: defaultSpeed,
    cooling: 1
  };

  this.init = function () {
    var graph = self.graph;
    var nodes = graph.nodes;
    var edges = graph.edges;
    // var nodes = graph.nodes.filter(function (n) {
    //   return !n.hidden;
    // });
    // var edges = graph.edges.filter(function (e) {
    //   return !e.source.hidden && !e.target.hidden;
    // });
    self.graph.iterNodes(function (n) {
      n.fa = {
        old_dx: 0,
        old_dy: 0,
        dx: 0,
        dy: 0,
        freeze: 0
      };
    });
    nbNodes = nodes.length;

    return self;
  };

  this.go = function () {
    while (self.atomicGo()) {};
  };

  this.atomicGo = function () {
    var graph = self.graph;
    var nodes = graph.nodes;
    var edges = graph.edges;
    // var nodes = graph.nodes.filter(function (n) {
    //   return !n.hidden;
    // });
    // var edges = graph.edges.filter(function (e) {
    //   return !e.source.hidden && !e.target.hidden;
    // });

    var newNbNodes = nodes.length;

    for (var it = 0 ; it < nodes.length ; it++) {
      var n = nodes[it];
      if (!n.hasOwnProperty('fa')) {
        n.fa = {
          old_dx: 0,
          old_dy: 0,
          dx: 0,
          dy: 0,
          freeze: 0
        };
      }
      n.fa.old_dx = n.fa.dx;
      n.fa.old_dy = n.fa.dy;
      n.fa.dx *= self.p.inertia;
      n.fa.dy *= self.p.inertia;
    }

    if (nbNodes != newNbNodes) {
      oldAvgDist = Number.POSITIVE_INFINITY;
      self.p.speed = defaultSpeed;
      nbNodes = newNbNodes;
      // Reset freezing
      for (var it = 0 ; it < nodes.length ; it++) {
        var n = nodes[it];
          n.fa.freeze = 0;
      }
    }

    // Repulsion force
    for (var it = 0 ; it < nodes.length ; it++) {
      var n1 = nodes[it];
      for (var it2 = 0 ; it2 < nodes.length ; it2++) {
        var n2 = nodes[it2];
        if (n1 != n2) {
          var xDist = n1.x - n2.x;
          var yDist = n1.y - n2.y;
          var dist = Math.sqrt(xDist * xDist + yDist * yDist);

          if (dist > 0) {
            var c = self.p.repulsionStrength * (1 + n1.degree) * (1 + n2.degree);
            var force = 0.001 * c / dist;
            var dx = xDist / dist * force;
            var dy = yDist / dist * force;
            n1.fa.dx += dx;
            n1.fa.dy += dy;
            n2.fa.dx -= dx;
            n2.fa.dy -= dy;
          }
        }
      };
    };
    // Attraction force
    for (var it = 0 ; it < edges.length ; it++) {
      var e = edges[it];
      var nf = e.source;
      var nt = e.target;
      var bonus = (nf.fixed || nt.fixed) ? 100 : 1;
      // bonus *= e.weight; //FIXME

      // customization to make leafs more distant.
      //bonus *= (1 == nf.degree || 1 == nt.degree) ? 0.5 : 1;

      var xDist = nf.x - nt.x;
      var yDist = nf.y - nt.y;
      var dist = Math.sqrt(xDist * xDist + yDist * yDist);

      if (dist > 0) {
        var c = bonus * self.p.attractionStrength;
        var force = 0.01 * -c * dist;
        var dx = xDist / dist * force;
        var dy = yDist / dist * force;
        nf.fa.dx += dx;
        nf.fa.dy += dy;
        nt.fa.dx -= dx;
        nt.fa.dy -= dy;
      }
    };
    // Gravity
    for (var it = 0 ; it < nodes.length ; it++) {
      var n = nodes[it];
      var d = 0.0001 + Math.sqrt(n.x * n.x + n.y * n.y);
      var gf = 0.0001 * self.p.gravity * d;
      n.fa.dx -= gf * n.x / d;
      n.fa.dy -= gf * n.y / d;
    };
    // Speed
    if (self.p.freezeBalance) {
      for (var it = 0 ; it < nodes.length ; it++) {
        var n = nodes[it];
        var speed = self.p.speed * 20 / (1 + n.degree);  // speedup low-degree nodes
        n.fa.dx *= speed;
        n.fa.dy *= speed;
      };
    } else {
      for (var it = 0 ; it < nodes.length ; it++) {
        var n = nodes[it];
        n.fa.dx *= self.p.speed;
        n.fa.dy *= self.p.speed;
      };
    }
    // Apply computed displacement
    var sumDist = 0;
    for (var it = 0 ; it < nodes.length ; it++) {
      var n = nodes[it];
      if (-1 == $.inArray(n.id + '', fixedNodes)) {
        var d = 0.0001 + Math.sqrt(n.fa.dx * n.fa.dx + n.fa.dy * n.fa.dy);
        var ratio;
        if (self.p.freezeBalance) {
          n.fa.freeze = self.p.freezeInertia * n.fa.freeze + (1 - self.p.freezeInertia) * 0.1 * self.p.freezeStrength * (Math.sqrt(Math.sqrt((n.fa.old_dx - n.fa.dx) * (n.fa.old_dx - n.fa.dx) + (n.fa.old_dy - n.fa.dy) * (n.fa.old_dy - n.fa.dy))));
          ratio = Math.min((d / (d * (1 + n.fa.freeze))), self.p.maxDisplacement / d);
        } else {
          ratio = Math.min(1, self.p.maxDisplacement / d);
        }
        ratio /= self.p.cooling;
        n.fa.dx *= ratio;
        n.fa.dy *= ratio;
        n.x += n.fa.dx;
        n.y += n.fa.dy;

        var dist = Math.sqrt(n.fa.dx * n.fa.dx + n.fa.dy * n.fa.dy);
        sumDist += dist;
      }
    };

    // Global cooling (homebrew)
    var avgDist = sumDist / nbNodes;
    var diffDist = Math.abs(avgDist - oldAvgDist);
    //console.log(avgDist, 0.1 * Math.log(1 + nbNodes));
    //console.log(diffDist, 0.1 * Math.log(1 + nbNodes));
    //if (avgDist < (0.01 * Math.sqrt(nbNodes)) && diffDist < (0.01 * Math.sqrt(nbNodes))) {
    if (avgDist < (0.1 * Math.log(1 + nbNodes)) && diffDist < (0.1 * Math.log(1 + nbNodes))) {
      self.p.speed *= 0.99;
      if (self.p.speed < 0.1) {
        self.stop = true;
      }
    } else {
      self.p.speed = defaultSpeed;
    }
    oldAvgDist = avgDist;
  };

  this.end = function () {
    self.stop = true;
    self.graph.iterNodes(function (n) {
      delete n.fa;
    });
  };
};

sigma.publicPrototype.startForceAtlas = function () {
  this.ForceAtlas = new sigma.forceatlas.ForceAtlas(this._core.graph);
  this.ForceAtlas.init();

  this.addGenerator('ForceAtlas', this.ForceAtlas.atomicGo, function () {
    return true;
  });
};

sigma.publicPrototype.stopForceAtlas = function () {
  this.ForceAtlas.end();
  this.removeGenerator('ForceAtlas');
};