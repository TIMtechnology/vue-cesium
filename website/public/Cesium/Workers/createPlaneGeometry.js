define([
  './defaultValue-0a909f67',
  './Transforms-dadc538f',
  './Matrix3-b6f074fa',
  './ComponentDatatype-77274976',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './VertexFormat-ab2e00e6',
  './Math-e97915da',
  './Matrix2-163b5a1d',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './WebGLConstants-a8cc3e8c'
], function (t, e, n, a, r, o, i, m, u, c, p, s) {
  'use strict'
  function y(e) {
    e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)
    const n = t.defaultValue(e.vertexFormat, i.VertexFormat.DEFAULT)
    ;(this._vertexFormat = n), (this._workerName = 'createPlaneGeometry')
  }
  ;(y.packedLength = i.VertexFormat.packedLength),
    (y.pack = function (e, n, a) {
      return (a = t.defaultValue(a, 0)), i.VertexFormat.pack(e._vertexFormat, n, a), n
    })
  const l = new i.VertexFormat(),
    f = { vertexFormat: l }
  y.unpack = function (e, n, a) {
    n = t.defaultValue(n, 0)
    const r = i.VertexFormat.unpack(e, n, l)
    return t.defined(a) ? ((a._vertexFormat = i.VertexFormat.clone(r, a._vertexFormat)), a) : new y(f)
  }
  const A = new n.Cartesian3(-0.5, -0.5, 0),
    F = new n.Cartesian3(0.5, 0.5, 0)
  return (
    (y.createGeometry = function (t) {
      const i = t._vertexFormat,
        m = new o.GeometryAttributes()
      let u, c
      if (i.position) {
        if (
          ((c = new Float64Array(12)),
          (c[0] = A.x),
          (c[1] = A.y),
          (c[2] = 0),
          (c[3] = F.x),
          (c[4] = A.y),
          (c[5] = 0),
          (c[6] = F.x),
          (c[7] = F.y),
          (c[8] = 0),
          (c[9] = A.x),
          (c[10] = F.y),
          (c[11] = 0),
          (m.position = new r.GeometryAttribute({ componentDatatype: a.ComponentDatatype.DOUBLE, componentsPerAttribute: 3, values: c })),
          i.normal)
        ) {
          const t = new Float32Array(12)
          ;(t[0] = 0),
            (t[1] = 0),
            (t[2] = 1),
            (t[3] = 0),
            (t[4] = 0),
            (t[5] = 1),
            (t[6] = 0),
            (t[7] = 0),
            (t[8] = 1),
            (t[9] = 0),
            (t[10] = 0),
            (t[11] = 1),
            (m.normal = new r.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: t }))
        }
        if (i.st) {
          const t = new Float32Array(8)
          ;(t[0] = 0),
            (t[1] = 0),
            (t[2] = 1),
            (t[3] = 0),
            (t[4] = 1),
            (t[5] = 1),
            (t[6] = 0),
            (t[7] = 1),
            (m.st = new r.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 2, values: t }))
        }
        if (i.tangent) {
          const t = new Float32Array(12)
          ;(t[0] = 1),
            (t[1] = 0),
            (t[2] = 0),
            (t[3] = 1),
            (t[4] = 0),
            (t[5] = 0),
            (t[6] = 1),
            (t[7] = 0),
            (t[8] = 0),
            (t[9] = 1),
            (t[10] = 0),
            (t[11] = 0),
            (m.tangent = new r.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: t }))
        }
        if (i.bitangent) {
          const t = new Float32Array(12)
          ;(t[0] = 0),
            (t[1] = 1),
            (t[2] = 0),
            (t[3] = 0),
            (t[4] = 1),
            (t[5] = 0),
            (t[6] = 0),
            (t[7] = 1),
            (t[8] = 0),
            (t[9] = 0),
            (t[10] = 1),
            (t[11] = 0),
            (m.bitangent = new r.GeometryAttribute({ componentDatatype: a.ComponentDatatype.FLOAT, componentsPerAttribute: 3, values: t }))
        }
        ;(u = new Uint16Array(6)), (u[0] = 0), (u[1] = 1), (u[2] = 2), (u[3] = 0), (u[4] = 2), (u[5] = 3)
      }
      return new r.Geometry({
        attributes: m,
        indices: u,
        primitiveType: r.PrimitiveType.TRIANGLES,
        boundingSphere: new e.BoundingSphere(n.Cartesian3.ZERO, Math.sqrt(2))
      })
    }),
    function (e, n) {
      return t.defined(n) && (e = y.unpack(e, n)), y.createGeometry(e)
    }
  )
})
