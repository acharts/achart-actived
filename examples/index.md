# Demo

---

## Actived Shape

````html
<p>点击非互斥</p>
<div id="c1"></div>

````

````javascript
seajs.use(['index','achart-canvas','achart-util'], function(Actived,Canvas,Util) {

  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500
  });

  var group = canvas.addGroup();
  
  /**
   * @class AShape
   * 拥有actived状态的圆，此处仅仅是个示例
   */
  var AShape = function(cfg){
    AShape.superclass.constructor.call(this,cfg);
  };

  Util.extend(AShape,Canvas.Shape.Circle);

  Util.mixin(AShape,[Actived]);

  Util.augment(AShape,{
    parseElCfg : function(attrs){
      attrs.type = 'circle';
      return attrs;
    },  
    //actived发生改变的状态变化
    setActiveStatus : function(actived){
      var _self = this,
        attrs = _self.get('attrs'); //初始状态的attrs
      if(actived){
        if(attrs.stroke){
          _self.attr('stroke',Util.highlight(attrs.stroke,0.5));
        }
        if(attrs.fill){
          _self.attr('fill',Util.highlight(attrs.fill,0.5));
        }
      }else{
        _self.attr({
          fill : attrs.fill,
          stroke : attrs.stroke
        });
      }
    }
  });

  Canvas.Shape.AShape = AShape;

  for(var i = 50; i <= 450;i = i + 50){
    group.addShape('aShape',{
      cx : i,
      cy : i,
      r : 10,
      stroke : 'blue',
      fill : 'red'
    });
  }
  
  //点击激活，再点击取消
  group.on('click',function(ev){
    var shape = ev.target.shape;
    if(shape){
      if(shape.isActived()){
        shape.clearActived();
      }else{
        shape.setActived();
      }
      
    }
  });

});
````

## 使用Actived.Group,但是子项没有使用Actived

````html
<p>点击互斥</p>
<div id="c2"></div>

````

````javascript
seajs.use(['index','achart-canvas','achart-util'], function(Actived,Canvas,Util) {

  var canvas = new Canvas({
    id : 'c2',
    width : 500,
    height : 500
  });
  
  /**
   * @class AGroup
   * 管理actived，此处仅仅是个示例
   */
  var AGroup = function(cfg){
    AGroup.superclass.constructor.call(this,cfg);
  };

  Util.extend(AGroup,Canvas.Group);

  Util.mixin(AGroup,[Actived.Group]);

  Util.augment(AGroup,{

    bindUI : function(){
      var _self = this;

      _self.on('click',function(ev){
        var shape = ev.target.shape;
        if(shape){
          if(!_self.isItemActived(shape)){
            _self.setActivedItem(shape);
          }
        }
      });
    },

    isItemActived : function(item){
      return item.get('actived');
    },
    setItemActived : function(item,actived){
      var attrs = item.get('attrs');
      if(actived){
        item.set('actived',true);
        if(attrs.stroke){
          item.attr('stroke',Util.highlight(attrs.stroke,0.5));
        }
        if(attrs.fill){
          item.attr('fill',Util.highlight(attrs.fill,0.5));
        }
      }else{
        item.set('actived',false);
        item.attr({
          fill : attrs.fill,
          stroke : attrs.stroke
        });
      }
    }
  });

  var group = canvas.addGroup(AGroup);

  for(var i = 50; i <= 450;i = i + 50){
    group.addShape('circle',{
      cx : i,
      cy : i,
      r : 10,
      stroke : 'blue',
      fill : 'red'
    });
  }
});
````

## 同时使用


````html
<p>点击互斥</p>
<div id="c3"></div>

````

````javascript
seajs.use(['index','achart-canvas','achart-util'], function(Actived,Canvas,Util) {

  var canvas = new Canvas({
    id : 'c3',
    width : 500,
    height : 500
  });

  /**
   * @class AShape
   * 拥有actived状态的圆，此处仅仅是个示例
   */
  var AShape = function(cfg){
    AShape.superclass.constructor.call(this,cfg);
  };

  Util.extend(AShape,Canvas.Shape.Circle);

  Util.mixin(AShape,[Actived]);

  Util.augment(AShape,{
    parseElCfg : function(attrs){
      attrs.type = 'circle';
      return attrs;
    },  
    //actived发生改变的状态变化
    setActiveStatus : function(actived){
      var _self = this,
        attrs = _self.get('attrs'); //初始状态的attrs
      if(actived){
        if(attrs.stroke){
          _self.attr('stroke',Util.highlight(attrs.stroke,0.5));
        }
        if(attrs.fill){
          _self.attr('fill',Util.highlight(attrs.fill,0.5));
        }
      }else{
        _self.attr({
          fill : attrs.fill,
          stroke : attrs.stroke
        });
      }
    }
  });

  Canvas.Shape.AShape = AShape;
  
  /**
   * @class AGroup
   * 管理actived，此处仅仅是个示例
   */
  var AGroup = function(cfg){
    AGroup.superclass.constructor.call(this,cfg);
  };

  Util.extend(AGroup,Canvas.Group);

  Util.mixin(AGroup,[Actived.Group]);

  Util.augment(AGroup,{

    bindUI : function(){
      var _self = this;

      _self.on('click',function(ev){
        var shape = ev.target.shape;
        if(shape){
          if(!_self.isItemActived(shape)){
            _self.setActivedItem(shape);
          }
        }
      });
    }
  });

  var group = canvas.addGroup(AGroup);

  for(var i = 50; i <= 450;i = i + 50){
    group.addShape('aShape',{
      cx : i,
      cy : i,
      r : 10,
      stroke : 'blue',
      fill : 'red'
    });
  }
});
````

 
