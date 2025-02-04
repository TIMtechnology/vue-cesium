define([
  './defaultValue-0a909f67',
  './EllipsoidGeometry-ccc3a2e5',
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
  './GeometryOffsetAttribute-04332ce7',
  './IndexDatatype-2149f06c',
  './VertexFormat-ab2e00e6'
], function (e, t, a, r, o, i, c, n, f, d, m, u, s, b, y) {
  'use strict'
  return function (a, r) {
    return e.defined(r) && (a = t.EllipsoidGeometry.unpack(a, r)), t.EllipsoidGeometry.createGeometry(a)
  }
})
