/*
 *      KonamiCode - implements the feature of the KonamiCode with MooTools
 *      written by Andrzej Kala
 *      http://bitrebel.com
 *
 *      Copyright (c) 2010 Andrzej Kala (http://bitrebel.com)
 *      Dual licensed under the MIT (http://bit.ly/TTtsU)
 *      and GPL (GPL-LICENSE.txt) licenses.
 *
 *      Built for Mootools library
 *      http://mootools.net
 *
 *      @callback - name of the callback function
 */
 
var KonamiCode = new Class({

    Implements: [Options, Events],
    // Init options
    options: {
        callback: null,
        comboTimer: 5000,
        correctCombination: [38,38,40,40,37,39,37,39,66,65]
        // up, up, down, down, left, right, left, right, "b", "a"
    },

    // Variables
    insertedCombination: [],
    timerInitialized: false,
    timer: null,
    

    initialize: function (options) {
        this.setOptions(options);
        var _class = this;
        
        if( this.options.callback !== null ) {
            document.addEvent('keyup', function(e) {
                // Correct key
                if (e.code == _class.options.correctCombination[_class.insertedCombination.length]) {
            
                    //if timer is not started start it
                    if( !_class.timerInitialized ) {
                        _class.timer = setTimeout(_class.reset, _class.options.comboTimer);
                        _class.timerInitialized = true;
                    }
                
                    // Push the correct key code to the array
                    _class.insertedCombination.push( e.code );
                
                    // If the combo is complete - launch the callback
                    if (_class.insertedCombination.length == _class.options.correctCombination.length ) {
                        _class.options.callback.call();
                    }
                // wrong key
                } else {
                    _class.reset();
                }
            });
        } else {
            alert("Konami Code error:\nHey, you forgot to add a callback function. Duuh!");
        }
        
    },
    
    // Clear out the array, timerInitilized and the timer itself
    reset: function() {
        this.timerInitialized    = false;
        this.insertedCombination = [];
        clearTimeout(this.timer);
    }
    
});