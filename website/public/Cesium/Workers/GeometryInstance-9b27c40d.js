define(['exports', './defaultValue-0a909f67', './Matrix2-163b5a1d'], function (e, t, i) {
  'use strict'
  e.GeometryInstance = function (e) {
    ;(e = t.defaultValue(e, t.defaultValue.EMPTY_OBJECT)),
      (this.geometry = e.geometry),
      (this.modelMatrix = i.Matrix4.clone(t.defaultValue(e.modelMatrix, i.Matrix4.IDENTITY))),
      (this.id = e.id),
      (this.pickPrimitive = e.pickPrimitive),
      (this.attributes = t.defaultValue(e.attributes, {})),
      (this.westHemisphereGeometry = void 0),
      (this.eastHemisphereGeometry = void 0)
  }
})
