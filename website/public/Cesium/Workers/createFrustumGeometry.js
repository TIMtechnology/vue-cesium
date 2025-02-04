define([
  './defaultValue-0a909f67',
  './FrustumGeometry-c033d358',
  './Transforms-dadc538f',
  './Matrix3-b6f074fa',
  './Math-e97915da',
  './Matrix2-163b5a1d',
  './RuntimeError-06c93819',
  './combine-ca22a614',
  './ComponentDatatype-77274976',
  './WebGLConstants-a8cc3e8c',
  './GeometryAttribute-e2b38d72',
  './GeometryAttributes-f06a2792',
  './Plane-1c5a21a3',
  './VertexFormat-ab2e00e6'
], function (e, t, r, a, n, u, o, c, m, f, i, d, s, b) {
  'use strict'
  return function (r, a) {
    return e.defined(a) && (r = t.FrustumGeometry.unpack(r, a)), t.FrustumGeometry.createGeometry(r)
  }
})
