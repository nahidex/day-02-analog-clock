var Clock = function(settings){
    this.settings = settings || {};

    // Initialize Instace
    this.Init();
};


Clock.prototype.Constant_ = {
    weekDay: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
};

Clock.prototype.CssClasses_ = {
    SECOND_HAND: '.second',
    MINUTE_HAND: '.minute',
    HOUR_HAND: '.hour',
    DAY_HOLDER: '.day',
    DATE_HOLDER: '.date'
};

Clock.prototype.setUp_ = function(val, selector){
    var val = selector || val;
    return document.querySelector(val); 
};

Clock.prototype.Init = function(settings){
   
    var self = this;

    this.secondHand = this.setUp_(this.CssClasses_.SECOND_HAND, this.settings.secondHand);
    this.minuteHand = this.setUp_(this.CssClasses_.MINUTE_HAND, this.settings.minuteHand);
    this.hourHand = this.setUp_(this.CssClasses_.HOUR_HAND, this.settings.hourHand);
    this.dayHolder = this.setUp_(this.CssClasses_.DAY_HOLDER, this.settings.dayHolder);
    this.dateHolder = this.setUp_(this.CssClasses_.DATE_HOLDER, this.settings.dateHlder);

    this.setDate();

    setInterval(function(){
        self.timer();
    }, 1000);
};

Clock.prototype.timer = function() {
    this.setHandRotation('second');
    this.setHandRotation('minute');
    this.setHandRotation('hour');
}

Clock.prototype.setHandRotation = function(hand){
    var now = new Date(), seconds, minutes, hours, degree;

    switch (hand) {
        case 'second':
            seconds = now.getSeconds();
            hand = this.secondHand;
            degree = (seconds * 6) + 90;
            break;
        case 'minute':
            minutes = now.getMinutes();
            hand = this.minuteHand;
            degree = (minutes * 6) + 90;
            break;
        case 'hour':
            hours = now.getHours();
            minutes = now.getMinutes();
            hand = this.hourHand;
            degree = (hours * 30 + minutes * 0.5) + 90;
            break;
    }

    hand.style.transform = 'rotate(' + degree + 'deg)';
}

Clock.prototype.setDate = function(){
    var now = new Date();
    var day = now.getDay();
    var date = now.getDate();

	this.dayHolder.textContent = this.Constant_.weekDay[day];
	this.dateHolder.textContent = date;
}


var clock = new Clock();

