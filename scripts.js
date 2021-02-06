// Create Countdown
var Countdown = {
	// Backbone-like structure
	$el: $(".countdown"),

	// Params
	countdown_interval: null,

	// Initialize the countdown
	init: function () {
        const now = moment(new Date()); // Data de hoje
		const past = moment("2016-09-06"); // Outra data no passado
		const duration = moment.duration(now.diff(past));
        
		// DOM
		this.$ = {
			years: this.$el.find(".bloc-time.years .figure"),
			months: this.$el.find(".bloc-time.months .figure"),
			days: this.$el.find(".bloc-time.days .figure"),
			hours: this.$el.find(".bloc-time.hours .figure"),
			minutes: this.$el.find(".bloc-time.min .figure"),
			seconds: this.$el.find(".bloc-time.sec .figure"),
		};
        
		// Init countdown values
		this.values = {
			years: duration._data.years,
			months: duration._data.months,
			days: duration._data.days,
			hours: duration._data.hours,
			minutes: duration._data.minutes,
			seconds: duration._data.seconds,
		};

		// Animate countdown to the end
		this.count();
	},

	count: function () {
		var that = this,
            days_in_month = new Date(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                0
            ).getDate(),
			$year_1 = this.$.years.eq(0),
			$year_2 = this.$.years.eq(1),
			$month_1 = this.$.months.eq(0),
			$month_2 = this.$.months.eq(1),
			$day_1 = this.$.days.eq(0),
			$day_2 = this.$.days.eq(1),
			$hour_1 = this.$.hours.eq(0),
			$hour_2 = this.$.hours.eq(1),
			$min_1 = this.$.minutes.eq(0),
			$min_2 = this.$.minutes.eq(1),
			$sec_1 = this.$.seconds.eq(0),
			$sec_2 = this.$.seconds.eq(1);

		this.countdown_interval = setInterval(function () {
			++that.values.seconds;

			if (that.values.seconds > 59) {
				that.values.seconds = 0;
				++that.values.minutes;
			}

			if (that.values.minutes > 59) {
				that.values.minutes = 0;
				++that.values.hours;
			}
			
            if (that.values.hours > 23) {
				that.values.hours = 0;
				++that.values.days;
			}
            
            if (that.values.days >= days_in_month) {
				that.values.days = 0;
				++that.values.months;
			}
            
            if (that.values.months > 11) {
				that.values.months = 0;
				++that.values.years;
			}

			// Update DOM values
			// Years
			that.checkHour(that.values.years, $year_1, $year_2);

			// Months
			that.checkHour(that.values.months, $month_1, $month_2);

			// Days
			that.checkHour(that.values.days, $day_1, $day_2);

			// Hours
			that.checkHour(that.values.hours, $hour_1, $hour_2);

			// Minutes
			that.checkHour(that.values.minutes, $min_1, $min_2);

			// Seconds
			that.checkHour(that.values.seconds, $sec_1, $sec_2);
		}, 1000);
	},

	animateFigure: function ($el, value) {
		var that = this,
			$top = $el.find(".top"),
			$bottom = $el.find(".bottom"),
			$back_top = $el.find(".top-back"),
			$back_bottom = $el.find(".bottom-back");

		// Before we begin, change the back value
		$back_top.find("span").html(value);

		// Also change the back bottom value
		$back_bottom.find("span").html(value);

		// Then animate
		TweenMax.to($top, 0.8, {
			rotationX: "-180deg",
			transformPerspective: 300,
			ease: Quart.easeOut,
			onComplete: function () {
				$top.html(value);

				$bottom.html(value);

				TweenMax.set($top, { rotationX: 0 });
			},
		});

		TweenMax.to($back_top, 0.8, {
			rotationX: 0,
			transformPerspective: 300,
			ease: Quart.easeOut,
			clearProps: "all",
		});
	},

	checkHour: function (value, $el_1, $el_2) {
		var val_1 = value.toString().charAt(0),
			val_2 = value.toString().charAt(1),
			fig_1_value = $el_1.find(".top").html(),
			fig_2_value = $el_2.find(".top").html();

		if (value >= 10) {
			// Animate only if the figure has changed
			if (fig_1_value !== val_1) this.animateFigure($el_1, val_1);
			if (fig_2_value !== val_2) this.animateFigure($el_2, val_2);
		} else {
			// If we are under 10, replace first figure with 0
			if (fig_1_value !== "0") this.animateFigure($el_1, 0);
			if (fig_2_value !== val_1) this.animateFigure($el_2, val_1);
		}
	},
};

// Let's go !
Countdown.init();
