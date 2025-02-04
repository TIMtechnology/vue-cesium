/*
 * @Author: zouyaoji@https://github.com/zouyaoji
 * @Date: 2021-10-28 09:20:11
 * @LastEditTime: 2021-10-28 09:32:24
 * @LastEditors: zouyaoji
 * @Description:
 * @FilePath: \vue-cesium@next\packages\components\overlays\wind\glsl\fullscreen.ts
 */
const text = `
attribute vec3 position;
attribute vec2 st;

varying vec2 textureCoordinate;

void main() {
    textureCoordinate = st;
    gl_Position = vec4(position, 1.0);
}
`
export default text
