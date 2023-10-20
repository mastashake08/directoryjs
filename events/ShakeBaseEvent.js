/**
 * @class ShakeBaseEvent - Base class for ShakeEvents
 */
class ShakeBaseEvent extends Event {
    /**
     * @constructor - create a new instance of ShakeBaseEvent
     * @param {String} name - name of the custom event
     * @param {Boolean} bubbles - can this event bubble up to ancestors? Defaults to false
     * @param {Object} data - data passed to the event
     * @param {Boolean} loggableEvent - when event is called it something that is loggable? Defaults to false
     */
    constructor(name = 'ShakeBaseEvent', bubbles = false, data = {}, loggableEvent = false, logEvent = () => { console.table(this)}) { 
        super(name, {bubbles: bubbles});
        this.data = data;
        this.loggableEvent = loggableEvent;
        this.logEvent = logEvent;
        this.logEvent();
    }
    
}

export {
    ShakeBaseEvent
}