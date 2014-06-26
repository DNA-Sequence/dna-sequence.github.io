/**
 * Created by samuel on 17/06/14.
 */

(function( window ) {

    var StringBuffer = new Class({
        initialize: function(_string) {
            this.string = "";
            if(_string){
                this.string = _string;
            }
        },
        insert : function(index, _s){

            if (index > 0){
                this.string = this.string.substring(0, index) + _s + this.string.substring(index, this.string.length);
            } else {
                this.string = _s + this.string;
            }

            return this.string;
        },
        toString : function(){
            return this.string;
        }
    });

    window.StringBuffer = StringBuffer;

})(window);