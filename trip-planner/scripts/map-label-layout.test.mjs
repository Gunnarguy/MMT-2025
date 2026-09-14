import test from 'node:test';
import assert from 'node:assert/strict';
import {layoutMapLabels} from '../src/lib/mapLabelLayout.js';

const rect = l => ({left:l.labelX-l.width/2,right:l.labelX+l.width/2,top:l.labelY-l.height/2,bottom:l.labelY+l.height/2});
const overlaps = (a,b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
test('nearby place labels remain inside a phone map and separate without moving their pins', () => {
  const items = [{x:55,y:160,width:96,height:20},{x:80,y:165,width:98,height:20},{x:110,y:170,width:78,height:20},{x:280,y:160,width:96,height:20},{x:90,y:290,width:100,height:20}];
  const result=layoutMapLabels(items,320,400);
  for (let i=0;i<result.length;i++) {
    assert.equal(result[i].x,items[i].x); assert.equal(result[i].y,items[i].y);
    const box=rect(result[i]);
    assert.ok(box.left>=0 && box.right<=320 && box.top>=0 && box.bottom<=400);
    for (let j=0;j<i;j++) assert.equal(overlaps(box,rect(result[j])),false);
  }
});
test('edge labels avoid zoom controls and stay in the canvas',()=>{
  const obstacle={left:8,right:60,top:8,bottom:108};
  const result=layoutMapLabels([{x:2,y:3,width:100,height:20},{x:319,y:399,width:100,height:20}],320,400,[obstacle]);
  for(const label of result){const box=rect(label);assert.ok(box.left>=0 && box.right<=320 && box.top>=0 && box.bottom<=400);assert.equal(overlaps(box,obstacle),false);}
});
