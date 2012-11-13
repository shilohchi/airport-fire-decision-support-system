/*
 * Ext JS Library 2.1
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

Ext.Spotlight = function(config){
    Ext.apply(this, config);
}
Ext.Spotlight.prototype = {
    active : false,
    animate : true,
    animated : false,
    duration: 1,
    easing:'easeIn',
    


    createElements : function(){
        var bd = Ext.getBody();

        this.right = bd.createChild({cls:'x-spotlight'});
        this.left = bd.createChild({cls:'x-spotlight'});
        this.top = bd.createChild({cls:'x-spotlight'});
        this.bottom = bd.createChild({cls:'x-spotlight'});

        this.all = new Ext.CompositeElement([this.right, this.left, this.top, this.bottom]);
    },

    show : function(el, callback, scope){
        if(this.animated){
            this.show.defer(10, this, [el, callback, scope]);
            return;
        }
        this.el = Ext.get(el);
        if(!this.right){
            this.createElements();
        }
        if(!this.active){
            this.all.setDisplayed('');
            this.applyBounds(true, false);
            this.active = true;
            Ext.EventManager.onWindowResize(this.syncSize, this);
            this.applyBounds(false, this.animate, false, callback, scope);
        }else{
            this.applyBounds(false, false, false, callback, scope); // all these booleans look hideous
        }
    },

    hide : function(callback, scope){
        if(this.animated){
            this.hide.defer(50, this, [callback, scope]);
            return;
        }
        Ext.EventManager.removeResizeListener(this.syncSize, this);
        this.applyBounds(true, this.animate, true, callback, scope);
    },

    doHide : function(){
        this.active = false;
        this.all.setDisplayed(false);
    },

    syncSize : function(){
        this.applyBounds(false, false);
    },

    applyBounds : function(basePts, anim, doHide, callback, scope){

        var rg = this.el.getRegion();

        var dw = Ext.lib.Dom.getViewWidth(true);
        var dh = Ext.lib.Dom.getViewHeight(true);

        var c = 0, cb = false;
        if(anim){
            cb = {
                callback: function(){
                    c++;
                    if(c == 4){
                        this.animated = false;
                        if(doHide){
                            this.doHide();
                        }
                        Ext.callback(callback, scope, [this]);
                    }
                },
                scope: this,
                duration: this.duration,
                easing: this.easing
            };
            this.animated = true;
        }

        this.right.setBounds(
                rg.right,
                basePts ? dh : rg.top,
                dw - rg.right,
                basePts ? 0 : (dh - rg.top),
                cb);

        this.left.setBounds(
                0,
                0,
                rg.left,
                basePts ? 0 : rg.bottom,
                cb);

        this.top.setBounds(
                basePts ? dw : rg.left,
                0,
                basePts ? 0 : dw - rg.left,
                rg.top,
                cb);

        this.bottom.setBounds(
                0,
                rg.bottom,
                basePts ? 0 : rg.right,
                dh - rg.bottom,
                cb);

        if(!anim){
            if(doHide){
                this.doHide();
            }
            if(callback){
                Ext.callback(callback, scope, [this]);
            }
        }
    },

    destroy : function(){
        this.doHide();
        Ext.destroy(
                this.right,
                this.left,
                this.top,
                this.bottom);
        delete this.el;
        delete this.all;
    }
};
Ext.ux.SliderTip = Ext.extend(Ext.Tip, {
    minWidth: 10,
    offsets : [0, -10],
    init : function(slider){
        slider.on('dragstart', this.onSlide, this);
        slider.on('drag', this.onSlide, this);
        slider.on('dragend', this.hide, this);
        slider.on('destroy', this.destroy, this);
    },

    onSlide : function(slider){
        this.show();
        this.body.update(this.getText(slider));
        this.doAutoWidth();
        this.el.alignTo(slider.thumb, 'b-t?', this.offsets);
    },

    getText : function(slider){
        return slider.getValue();
    }
});
Ext.ux.Label = Ext.extend(Ext.BoxComponent, {
    setValue:function(value)
    {   
        this.el.update(value);
    },
    onRender: function(ct, position){
        if(!this.el){
            this.el = document.createElement('label');
            this.el.id = this.getId();
            this.el.innerHTML = this.text ;//? Ext.util.Format.htmlEncode(this.text) : (this.html || '');
            if(this.forId){
                this.el.setAttribute('htmlFor', this.forId);
            }
        }
        Ext.form.Label.superclass.onRender.call(this, ct, position);
    }
});

