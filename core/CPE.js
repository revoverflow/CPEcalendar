const axios = require('axios');

class CPE {

    static BASE_URL = 'https://mycpe.cpe.fr/mobile/';
    
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    login() {
        return new Promise(async (rs, rj) => {
            axios.post(CPE.BASE_URL + 'login', {
                login: this.email,
                password: this.password
            }, {
                headers: {
                    'x-requested-with': 'fr.auriga.mobile927346'
                }
            }).then(res => {
                this.tokens = {
                    normal: res.data.normal,
                    refresh: res.data.comptage
                };

                rs(true);
            }).catch(err => {
                rj(err);
            });
        });
    }

    getConfiguration() {
        return new Promise(async (rs, rj) => {
            axios.get(CPE.BASE_URL + 'configuration', {
                headers: {
                    'Authorization': 'Bearer ' + this.tokens.normal,
                    'x-requested-with': 'fr.auriga.mobile927346'
                }
            }).then(res => {
                rs(res.data);
            }).catch(err => {
                rj(err);
            });
        });
    }

    getPlanning(dateDebut, dateFin) {
        return new Promise(async (rs, rj) => {
            axios.get(CPE.BASE_URL + 'mon_planning?date_debut=' + dateDebut + '&date_fin=' + dateFin, {
                headers: {
                    'Authorization': 'Bearer ' + this.tokens.normal,
                    'x-requested-with': 'fr.auriga.mobile927346'
                }
            }).then(res => {
                rs(res.data);
            }).catch(err => {
                rj(err);
            });
        });
    }

    getNotes() {
        return new Promise(async (rs, rj) => {
            axios.get(CPE.BASE_URL + 'mes_notes', {
                headers: {
                    'Authorization': 'Bearer ' + this.tokens.normal,
                    'x-requested-with': 'fr.auriga.mobile927346'
                }
            }).then(res => {
                rs(res.data);
            }).catch(err => {
                rj(err);
            });
        });
    }

    getAbsences() {
        return new Promise(async (rs, rj) => {
            axios.get(CPE.BASE_URL + 'mes_absences', {
                headers: {
                    'Authorization': 'Bearer ' + this.tokens.normal,
                    'x-requested-with': 'fr.auriga.mobile927346'
                }
            }).then(res => {
                rs(res.data);
            }).catch(err => {
                rj(err);
            });
        });
    }

}

module.exports = CPE;