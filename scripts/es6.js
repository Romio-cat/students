class Student {
    constructor(name, surname, birth) {
        this._count = 0;
        this.name = name;
        this.surname = surname;
        this.birth = birth;
        this.rating = [50, 60, 70, 80, 90, 120, 99];
        this.presence = new Array(25);
    }

    getAge() {
        return new Date().getFullYear() - this.birth;
    };

    getAverageRating() {
        return Math.round(this.rating.reduce((prev, next) => {
            return prev + next;
        }) / this.rating.length);
    };

    present() {
        return this._count !== 25 ?
            this.presence[this._count++] = true :
            'нет места в журнале';
    };

    absent() {
        return this._count !== 25 ?
            this.presence[this._count++] = false :
            'нет места в журнале';
    };

    getAveragePresence() {
        let averageAttendance;
        let present = 0;

        for (let i = 0; i < this.presence.length; i++) {
            present += +this.presence[i];
        }

        return averageAttendance = +(present / this.presence.length).toFixed(1);
    };

    summary() {
        let averageRating = this.getAverageRating();
        let averagePresence = this.getAveragePresence();

        if (averageRating > 90 && averagePresence > 0.9) {
            return 'Ути какой молодчинка!';
        } else if (averageRating > 90 || averagePresence > 0.9) {
            return 'Норм, но можно лучше';
        } else {
            return 'Редиска!';
        }
    };
}

const stas = new Student('Стас', 'Нико', 1989);
const leha = new Student('Леха', 'Кулынык', 1994);
const boris = new Student('Борис', 'Бритва', 1991);

for (let x = 0; x < 10; x++) {
    stas.present();
    leha.absent();
}

for (let y = 0; y < 15; y++) {
    stas.absent();
    leha.present();
}

for (let z = 0; z < 25; z++) {
    boris.present();
}

////////////////////////////////////

class Group {
    constructor(...students) {
        this.group = students;
    }

    attendance(surname) {
        let getSummaryAttendanceGroup = 0;
        let studentPosition;

        if (!arguments.length) {
            for (let i = 0; i < this.group.length; i++) {
                getSummaryAttendanceGroup += this.group[i].getAveragePresence();
            }

            return getSummaryAttendanceGroup / this.group.length;
        }

        this.group
            .sort((a, b) => {
                return b.getAveragePresence() - a.getAveragePresence();
            })
            .forEach((item, index) => {
                item.surname === surname ?
                    studentPosition = index + 1 :
                    'Такого студента нет';
            });

        return studentPosition;
    };

    performance(surname) {
        let getSummaryRatingGroup = 0;
        let studentPosition;

        if (!arguments.length) {
            for (let i = 0; i < this.group.length; i++) {
                getSummaryRatingGroup += this.group[i].getAverageRating();
            }

            return getSummaryRatingGroup / this.group.length;
        }

        this.group
            .sort((a, b) => {
                return b.getAverageRating() - a.getAverageRating();
            })
            .forEach((item, index) => {
                item.surname === surname ?
                    studentPosition = index + 1 :
                    'Такого студента нет';
            });

        return studentPosition;
    };
}

const group = new Group(stas, boris, leha);
