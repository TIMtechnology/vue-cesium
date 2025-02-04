define([
  './AttributeCompression-e18a879a',
  './Transforms-dadc538f',
  './Matrix2-163b5a1d',
  './Matrix3-b6f074fa',
  './defaultValue-0a909f67',
  './TerrainEncoding-6a85a8f8',
  './IndexDatatype-2149f06c',
  './Math-e97915da',
  './OrientedBoundingBox-83fb8c71',
  './createTaskProcessorWorker',
  './ComponentDatatype-77274976',
  './WebGLConstants-a8cc3e8c',
  './combine-ca22a614',
  './RuntimeError-06c93819',
  './EllipsoidTangentPlane-f7077c2e',
  './AxisAlignedBoundingBox-e5bb9f92',
  './IntersectionTests-1307e0a8',
  './Plane-1c5a21a3'
], function (e, t, n, i, s, r, h, o, u, p, d, a, l, c, f, g, m, x) {
  'use strict'
  const w = {
    clipTriangleAtAxisAlignedThreshold: function (e, t, n, i, r, h) {
      let o, u, p
      s.defined(h) ? (h.length = 0) : (h = []), t ? ((o = n < e), (u = i < e), (p = r < e)) : ((o = n > e), (u = i > e), (p = r > e))
      const d = o + u + p
      let a, l, c, f, g, m
      return (
        1 === d
          ? o
            ? ((a = (e - n) / (i - n)),
              (l = (e - n) / (r - n)),
              h.push(1),
              h.push(2),
              1 !== l && (h.push(-1), h.push(0), h.push(2), h.push(l)),
              1 !== a && (h.push(-1), h.push(0), h.push(1), h.push(a)))
            : u
            ? ((c = (e - i) / (r - i)),
              (f = (e - i) / (n - i)),
              h.push(2),
              h.push(0),
              1 !== f && (h.push(-1), h.push(1), h.push(0), h.push(f)),
              1 !== c && (h.push(-1), h.push(1), h.push(2), h.push(c)))
            : p &&
              ((g = (e - r) / (n - r)),
              (m = (e - r) / (i - r)),
              h.push(0),
              h.push(1),
              1 !== m && (h.push(-1), h.push(2), h.push(1), h.push(m)),
              1 !== g && (h.push(-1), h.push(2), h.push(0), h.push(g)))
          : 2 === d
          ? o || n === e
            ? u || i === e
              ? p ||
                r === e ||
                ((l = (e - n) / (r - n)),
                (c = (e - i) / (r - i)),
                h.push(2),
                h.push(-1),
                h.push(0),
                h.push(2),
                h.push(l),
                h.push(-1),
                h.push(1),
                h.push(2),
                h.push(c))
              : ((m = (e - r) / (i - r)),
                (a = (e - n) / (i - n)),
                h.push(1),
                h.push(-1),
                h.push(2),
                h.push(1),
                h.push(m),
                h.push(-1),
                h.push(0),
                h.push(1),
                h.push(a))
            : ((f = (e - i) / (n - i)),
              (g = (e - r) / (n - r)),
              h.push(0),
              h.push(-1),
              h.push(1),
              h.push(0),
              h.push(f),
              h.push(-1),
              h.push(2),
              h.push(0),
              h.push(g))
          : 3 !== d && (h.push(0), h.push(1), h.push(2)),
        h
      )
    },
    computeBarycentricCoordinates: function (e, t, n, r, h, o, u, p, d) {
      const a = n - u,
        l = u - h,
        c = o - p,
        f = r - p,
        g = 1 / (c * a + l * f),
        m = t - p,
        x = e - u,
        w = (c * x + l * m) * g,
        C = (-f * x + a * m) * g,
        B = 1 - w - C
      return s.defined(d) ? ((d.x = w), (d.y = C), (d.z = B), d) : new i.Cartesian3(w, C, B)
    },
    computeLineSegmentLineSegmentIntersection: function (e, t, i, r, h, o, u, p, d) {
      const a = (p - o) * (i - e) - (u - h) * (r - t)
      if (0 === a) return
      const l = ((u - h) * (t - o) - (p - o) * (e - h)) / a,
        c = ((i - e) * (t - o) - (r - t) * (e - h)) / a
      return l >= 0 && l <= 1 && c >= 0 && c <= 1
        ? (s.defined(d) || (d = new n.Cartesian2()), (d.x = e + l * (i - e)), (d.y = t + l * (r - t)), d)
        : void 0
    }
  }
  var C = w
  const B = 32767,
    y = 16383,
    I = [],
    A = [],
    b = [],
    v = new i.Cartographic()
  let T = new i.Cartesian3()
  const M = [],
    z = [],
    V = [],
    N = [],
    E = [],
    R = new i.Cartesian3(),
    H = new t.BoundingSphere(),
    O = new u.OrientedBoundingBox(),
    S = new n.Cartesian2(),
    U = new i.Cartesian3()
  function F() {
    ;(this.vertexBuffer = void 0), (this.index = void 0), (this.first = void 0), (this.second = void 0), (this.ratio = void 0)
  }
  ;(F.prototype.clone = function (e) {
    return (
      s.defined(e) || (e = new F()),
      (e.uBuffer = this.uBuffer),
      (e.vBuffer = this.vBuffer),
      (e.heightBuffer = this.heightBuffer),
      (e.normalBuffer = this.normalBuffer),
      (e.index = this.index),
      (e.first = this.first),
      (e.second = this.second),
      (e.ratio = this.ratio),
      e
    )
  }),
    (F.prototype.initializeIndexed = function (e, t, n, i, s) {
      ;(this.uBuffer = e),
        (this.vBuffer = t),
        (this.heightBuffer = n),
        (this.normalBuffer = i),
        (this.index = s),
        (this.first = void 0),
        (this.second = void 0),
        (this.ratio = void 0)
    }),
    (F.prototype.initializeFromClipResult = function (e, t, n) {
      let i = t + 1
      return (
        -1 !== e[t]
          ? n[e[t]].clone(this)
          : ((this.vertexBuffer = void 0),
            (this.index = void 0),
            (this.first = n[e[i]]),
            ++i,
            (this.second = n[e[i]]),
            ++i,
            (this.ratio = e[i]),
            ++i),
        i
      )
    }),
    (F.prototype.getKey = function () {
      return this.isIndexed() ? this.index : JSON.stringify({ first: this.first.getKey(), second: this.second.getKey(), ratio: this.ratio })
    }),
    (F.prototype.isIndexed = function () {
      return s.defined(this.index)
    }),
    (F.prototype.getH = function () {
      return s.defined(this.index) ? this.heightBuffer[this.index] : o.CesiumMath.lerp(this.first.getH(), this.second.getH(), this.ratio)
    }),
    (F.prototype.getU = function () {
      return s.defined(this.index) ? this.uBuffer[this.index] : o.CesiumMath.lerp(this.first.getU(), this.second.getU(), this.ratio)
    }),
    (F.prototype.getV = function () {
      return s.defined(this.index) ? this.vBuffer[this.index] : o.CesiumMath.lerp(this.first.getV(), this.second.getV(), this.ratio)
    })
  let P = new n.Cartesian2(),
    D = -1
  const W = [new i.Cartesian3(), new i.Cartesian3()],
    X = [new i.Cartesian3(), new i.Cartesian3()]
  function k(t, n) {
    ++D
    let s = W[D],
      r = X[D]
    return (
      (s = e.AttributeCompression.octDecode(t.first.getNormalX(), t.first.getNormalY(), s)),
      (r = e.AttributeCompression.octDecode(t.second.getNormalX(), t.second.getNormalY(), r)),
      (T = i.Cartesian3.lerp(s, r, t.ratio, T)),
      i.Cartesian3.normalize(T, T),
      e.AttributeCompression.octEncode(T, n),
      --D,
      n
    )
  }
  ;(F.prototype.getNormalX = function () {
    return s.defined(this.index) ? this.normalBuffer[2 * this.index] : ((P = k(this, P)), P.x)
  }),
    (F.prototype.getNormalY = function () {
      return s.defined(this.index) ? this.normalBuffer[2 * this.index + 1] : ((P = k(this, P)), P.y)
    })
  const K = []
  function L(e, t, n, i, r, h, o, u, p) {
    if (0 === o.length) return
    let d = 0,
      a = 0
    for (; a < o.length; ) a = K[d++].initializeFromClipResult(o, a, u)
    for (let r = 0; r < d; ++r) {
      const o = K[r]
      if (o.isIndexed()) (o.newIndex = h[o.index]), (o.uBuffer = e), (o.vBuffer = t), (o.heightBuffer = n), p && (o.normalBuffer = i)
      else {
        const r = o.getKey()
        if (s.defined(h[r])) o.newIndex = h[r]
        else {
          const s = e.length
          e.push(o.getU()), t.push(o.getV()), n.push(o.getH()), p && (i.push(o.getNormalX()), i.push(o.getNormalY())), (o.newIndex = s), (h[r] = s)
        }
      }
    }
    3 === d
      ? (r.push(K[0].newIndex), r.push(K[1].newIndex), r.push(K[2].newIndex))
      : 4 === d &&
        (r.push(K[0].newIndex), r.push(K[1].newIndex), r.push(K[2].newIndex), r.push(K[0].newIndex), r.push(K[2].newIndex), r.push(K[3].newIndex))
  }
  return (
    K.push(new F()),
    K.push(new F()),
    K.push(new F()),
    K.push(new F()),
    p(function (e, s) {
      const p = e.isEastChild,
        d = e.isNorthChild,
        a = p ? y : 0,
        l = p ? B : y,
        c = d ? y : 0,
        f = d ? B : y,
        g = M,
        m = z,
        x = V,
        w = E
      ;(g.length = 0), (m.length = 0), (x.length = 0), (w.length = 0)
      const P = N
      P.length = 0
      const D = {},
        W = e.vertices
      let X = e.indices
      X = X.subarray(0, e.indexCountWithoutSkirts)
      const k = r.TerrainEncoding.clone(e.encoding),
        K = k.hasVertexNormals
      let Y = 0
      const _ = e.vertexCountWithoutSkirts,
        G = e.minimumHeight,
        J = e.maximumHeight,
        Z = new Array(_),
        j = new Array(_),
        q = new Array(_),
        Q = K ? new Array(2 * _) : void 0
      let $, ee, te, ne, ie
      for (ee = 0, te = 0; ee < _; ++ee, te += 2) {
        const e = k.decodeTextureCoordinates(W, ee, S)
        if (
          (($ = k.decodeHeight(W, ee)),
          (ne = o.CesiumMath.clamp((e.x * B) | 0, 0, B)),
          (ie = o.CesiumMath.clamp((e.y * B) | 0, 0, B)),
          (q[ee] = o.CesiumMath.clamp(((($ - G) / (J - G)) * B) | 0, 0, B)),
          ne < 20 && (ne = 0),
          ie < 20 && (ie = 0),
          B - ne < 20 && (ne = B),
          B - ie < 20 && (ie = B),
          (Z[ee] = ne),
          (j[ee] = ie),
          K)
        ) {
          const e = k.getOctEncodedNormal(W, ee, U)
          ;(Q[te] = e.x), (Q[te + 1] = e.y)
        }
        ;((p && ne >= y) || (!p && ne <= y)) &&
          ((d && ie >= y) || (!d && ie <= y)) &&
          ((D[ee] = Y), g.push(ne), m.push(ie), x.push(q[ee]), K && (w.push(Q[te]), w.push(Q[te + 1])), ++Y)
      }
      const se = []
      se.push(new F()), se.push(new F()), se.push(new F())
      const re = []
      let he, oe
      for (re.push(new F()), re.push(new F()), re.push(new F()), ee = 0; ee < X.length; ee += 3) {
        const e = X[ee],
          t = X[ee + 1],
          n = X[ee + 2],
          i = Z[e],
          s = Z[t],
          r = Z[n]
        se[0].initializeIndexed(Z, j, q, Q, e), se[1].initializeIndexed(Z, j, q, Q, t), se[2].initializeIndexed(Z, j, q, Q, n)
        const h = C.clipTriangleAtAxisAlignedThreshold(y, p, i, s, r, I)
        ;(he = 0),
          he >= h.length ||
            ((he = re[0].initializeFromClipResult(h, he, se)),
            he >= h.length ||
              ((he = re[1].initializeFromClipResult(h, he, se)),
              he >= h.length ||
                ((he = re[2].initializeFromClipResult(h, he, se)),
                (oe = C.clipTriangleAtAxisAlignedThreshold(y, d, re[0].getV(), re[1].getV(), re[2].getV(), A)),
                L(g, m, x, w, P, D, oe, re, K),
                he < h.length &&
                  (re[2].clone(re[1]),
                  re[2].initializeFromClipResult(h, he, se),
                  (oe = C.clipTriangleAtAxisAlignedThreshold(y, d, re[0].getV(), re[1].getV(), re[2].getV(), A)),
                  L(g, m, x, w, P, D, oe, re, K)))))
      }
      const ue = p ? -32767 : 0,
        pe = d ? -32767 : 0,
        de = [],
        ae = [],
        le = [],
        ce = []
      let fe = Number.MAX_VALUE,
        ge = -fe
      const me = b
      me.length = 0
      const xe = i.Ellipsoid.clone(e.ellipsoid),
        we = n.Rectangle.clone(e.childRectangle),
        Ce = we.north,
        Be = we.south
      let ye = we.east
      const Ie = we.west
      for (ye < Ie && (ye += o.CesiumMath.TWO_PI), ee = 0; ee < g.length; ++ee)
        (ne = Math.round(g[ee])),
          ne <= a ? (de.push(ee), (ne = 0)) : ne >= l ? (le.push(ee), (ne = B)) : (ne = 2 * ne + ue),
          (g[ee] = ne),
          (ie = Math.round(m[ee])),
          ie <= c ? (ae.push(ee), (ie = 0)) : ie >= f ? (ce.push(ee), (ie = B)) : (ie = 2 * ie + pe),
          (m[ee] = ie),
          ($ = o.CesiumMath.lerp(G, J, x[ee] / B)),
          $ < fe && (fe = $),
          $ > ge && (ge = $),
          (x[ee] = $),
          (v.longitude = o.CesiumMath.lerp(Ie, ye, ne / B)),
          (v.latitude = o.CesiumMath.lerp(Be, Ce, ie / B)),
          (v.height = $),
          xe.cartographicToCartesian(v, T),
          me.push(T.x),
          me.push(T.y),
          me.push(T.z)
      const Ae = t.BoundingSphere.fromVertices(me, i.Cartesian3.ZERO, 3, H),
        be = u.OrientedBoundingBox.fromRectangle(we, fe, ge, xe, O),
        ve = new r.EllipsoidalOccluder(xe).computeHorizonCullingPointFromVerticesPossiblyUnderEllipsoid(Ae.center, me, 3, Ae.center, fe, R),
        Te = ge - fe,
        Me = new Uint16Array(g.length + m.length + x.length)
      for (ee = 0; ee < g.length; ++ee) Me[ee] = g[ee]
      let ze = g.length
      for (ee = 0; ee < m.length; ++ee) Me[ze + ee] = m[ee]
      for (ze += m.length, ee = 0; ee < x.length; ++ee) Me[ze + ee] = (B * (x[ee] - fe)) / Te
      const Ve = h.IndexDatatype.createTypedArray(g.length, P)
      let Ne
      if (K) {
        const e = new Uint8Array(w)
        s.push(Me.buffer, Ve.buffer, e.buffer), (Ne = e.buffer)
      } else s.push(Me.buffer, Ve.buffer)
      return {
        vertices: Me.buffer,
        encodedNormals: Ne,
        indices: Ve.buffer,
        minimumHeight: fe,
        maximumHeight: ge,
        westIndices: de,
        southIndices: ae,
        eastIndices: le,
        northIndices: ce,
        boundingSphere: Ae,
        orientedBoundingBox: be,
        horizonOcclusionPoint: ve
      }
    })
  )
})
