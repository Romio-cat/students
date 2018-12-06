enum messageTypes {
    NO_SPACE = 'нет места в журнале',
    NO_STUDENT = 'Такого студента нет'
}

class Student {
    private _count = 0;
    public name: string;
    public surname: string;
    public birth: number;
    public rating: number[] = [50, 60, 70, 80, 90, 120, 99];
    public presence: boolean[] = new Array(25);

    constructor(name: string, surname: string, birth: number) {
        this.name = name;
        this.surname = surname;
        this.birth = birth;
    }

    public getAge(): number {
        return new Date().getFullYear() - this.birth;
    };

    public getAverageRating(): number {
        return Math.round(this.rating.reduce((prev: number, next: number) => {
            return prev + next;
        }) / this.rating.length);
    };

    public present(): boolean | messageTypes {
        return this._count !== 25
            ? this.presence[this._count++] = true
            : messageTypes.NO_SPACE;
    };

    public absent(): boolean | messageTypes {
        return this._count !== 25
            ? this.presence[this._count++] = false
            : messageTypes.NO_SPACE;
    };

    public getAveragePresence(): number {
        let averageAttendance: number;
        let present = 0;

        for (let i = 0; i < this.presence.length; i++) {
            present += +this.presence[i];
        }

        return averageAttendance = +(present / this.presence.length).toFixed(1);
    };

    public summary(): string {
        let averageRating: number = this.getAverageRating();
        let averagePresence: number = this.getAveragePresence();

        if (averageRating > 90 && averagePresence > 0.9) {
            return 'Ути какой молодчинка!';
        } else if (averageRating > 90 || averagePresence > 0.9) {
            return 'Норм, но можно лучше';
        } else {
            return 'Редиска!';
        }
    };
}

const stas: Student = new Student('Стас', 'Нико', 1989);
const leha: Student = new Student('Леха', 'Кулынык', 1994);
const boris: Student = new Student('Борис', 'Бритва', 1991);

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
    public group: Student[];

    constructor(...students) {
        this.group = students;
    }

    public attendance(surname: string): number | messageTypes {
        let getSummaryAttendanceGroup = 0;
        let studentPosition: number;

        if (!arguments.length) {
            for (let i = 0; i < this.group.length; i++) {
                getSummaryAttendanceGroup += this.group[i].getAveragePresence();
            }

            return getSummaryAttendanceGroup / this.group.length;
        }

        this.group
            .sort((a: Student, b: Student) => {
                return b.getAveragePresence() - a.getAveragePresence();
            })
            .forEach((item: Student, index: number) => {
                item.surname === surname
                    ? studentPosition = index + 1
                    : messageTypes.NO_STUDENT;
            });

        return studentPosition;
    };

    public performance(surname: string): number | messageTypes {
        let getSummaryRatingGroup = 0;
        let studentPosition: number;

        if (!arguments.length) {
            for (let i = 0; i < this.group.length; i++) {
                getSummaryRatingGroup += this.group[i].getAverageRating();
            }

            return getSummaryRatingGroup / this.group.length;
        }

        this.group
            .sort((a: Student, b: Student) => {
                return b.getAverageRating() - a.getAverageRating();
            })
            .forEach((item: Student, index: number) => {
                item.surname === surname
                    ? studentPosition = index + 1
                    : messageTypes.NO_STUDENT;
            });

        return studentPosition;
    };
}

const group: Group = new Group(stas, boris, leha);
