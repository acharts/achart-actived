var expect = require('expect.js');
var Actived = require('../index'),
  Canvas = require('achart-canvas'),
  Util = require('achart-util');

var node = Util.createDom('<div id="s1"></div>');
document.body.appendChild(node);


var canvas = new Canvas({
  id : 's1',
  width : 500,
  height : 500
});


 var A = function(cfg){
    A.superclass.constructor.call(this,cfg);
  };

  Util.extend(A,Canvas.Group);
  Util.mixin(A,[Actived]);

describe('achart-actived', function() {

 
  var a = canvas.addGroup(A,{
    actived : true
  });

  it('create', function() {
    expect(a.get('actived')).to.be(true);
    a.set('actived',false);
    expect(a.get('actived')).to.be(false);

  });

  it('set active',function(){
    a.setActived();
    expect(a.get('actived')).to.be(true);

  });

  it('is active',function(){
    expect(a.isActived()).to.be(true);

  });

  it('clear active',function(){
    a.clearActived();
    expect(a.isActived()).to.be(false);
    expect(a.get('actived')).to.be(false);
  });

});


var B = function(cfg){
  B.superclass.constructor.call(this,cfg);
};

Util.extend(B,Canvas.Group);

Util.mixin(B,[Actived.Group]);

describe('achart-group-actived', function() {

  var b = canvas.addGroup(B);

  for(var i = 0; i< 10;i++){
    b.addGroup(A,{
      id : i
    });
  }

  it('create', function() {
    expect(b.getCount()).to.be(10);
    expect(b.getActived()).to.be(null);
  });

  it('set active',function(){
    var item = b.getFirst();
    b.setActivedItem(item);
    expect(item.isActived()).to.be(true);

    expect(b.getActived()).to.be(item);

    var last = b.getLast();

    b.setActivedItem(last);
    expect(item.isActived()).to.be(false);
    expect(last.isActived()).to.be(true);
    expect(b.getActived()).to.be(last);

  }); 

  it('clear active',function(){
    b.clearActivedItem();
    expect(b.getActived()).to.be(null);
  });

});

