function Student(name, surname, birth) {
    this._count = 0;
    this.name = name;
    this.surname = surname;
    this.birth = birth;
    this.rating = [50, 60, 70, 80, 90, 120, 99];
    this.presence = new Array(25);
}

Student.prototype.getAge = function () {
    return new Date().getFullYear() - this.birth;
};

Student.prototype.getAverageRating = function () {
    return Math.round(this.rating.reduce(function (prev, next) {
        return prev + next;
    }) / this.rating.length);
};

Student.prototype.present = function () {
    return this._count !== 25 ?
        this.presence[this._count++] = true :
        'нет места в журнале';
};

Student.prototype.absent = function () {
    return this._count !== 25 ?
        this.presence[this._count++] = false :
        'нет места в журнале';
};

Student.prototype.getAveragePresence = function() {
    var averageAttendance;
    var present = 0;

    for (var i = 0; i < this.presence.length; i++) {
        present += +this.presence[i];
    }

    return averageAttendance = +(present / this.presence.length).toFixed(1);
};

Student.prototype.summary = function () {
    var averageRating = this.getAverageRating();
    var averagePresence = this.getAveragePresence();

    if (averageRating > 90 && averagePresence > 0.9) {
        return 'Ути какой молодчинка!';
    } else if (averageRating > 90 || averagePresence > 0.9) {
        return 'Норм, но можно лучше';
    } else {
        return 'Редиска!';
    }
};

var stas = new Student('Стас', 'Нико', 1989);
var leha = new Student('Леха', 'Кулынык', 1994);
var boris = new Student('Борис', 'Бритва', 1991);

for (var x = 0; x < 10; x++) {
    stas.present();
    leha.absent();
}

for (var y = 0; y < 15; y++) {
    stas.absent();
    leha.present();
}

for (var z = 0; z < 25; z++) {
    boris.present();
}

////////////////////////////////////////////////

function Group() {
    this.group = [].slice.call(arguments);
}

Group.prototype.attendance = function(surname) {
    var getSummaryAttendanceGroup = 0;
    var studentPosition;

    if (!arguments.length) {
        for (var i = 0; i < this.group.length; i++) {
            getSummaryAttendanceGroup += this.group[i].getAveragePresence();
        }

        return getSummaryAttendanceGroup / this.group.length;
    }

    this.group
        .sort(function(a, b) {
            return b.getAveragePresence() - a.getAveragePresence();
        })
        .forEach(function(item, index) {
            item.surname === surname ?
                studentPosition = index + 1 :
                'Такого студента нет';
        });

    return studentPosition;
};

Group.prototype.performance = function(surname) {
    var getSummaryRatingGroup = 0;
    var studentPosition;

    if (!arguments.length) {
        for (var i = 0; i < this.group.length; i++) {
            getSummaryRatingGroup += this.group[i].getAverageRating();
        }

        return getSummaryRatingGroup / this.group.length;
    }

    this.group
        .sort(function(a, b) {
            return b.getAverageRating() - a.getAverageRating();
        })
        .forEach(function(item, index) {
            item.surname === surname ?
                studentPosition = index + 1 :
                'Такого студента нет';
        });

    return studentPosition;
};

var group = new Group(stas, boris, leha);
