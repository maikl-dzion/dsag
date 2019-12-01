export default {
    methods: {
        splitSiteUrl(sectionName) {
            if (!sectionName) sectionName = 'hash';
            var section = window.location[sectionName];
            var sectionArr = section.split('/');
            return sectionArr;
        },

        getUrlHashMap() {
            const hashArr = location.hash.split('/');
            return {
                className: hashArr[1],
                funcName: hashArr[2],
                id: hashArr[3]
            };
        },

        setUrlHash(params) {
            let hash = this.getUrlHashMap();
            Object.assign(hash, params);
            location.hash = `${hash.className}/${hash.funcName}/${hash.id}`;
        },

        makeRequest: function (method, url, data = null) {
            url = apiUrl + url; // prepend host part to relative url

            return new Promise((resolve, reject) => {
                this.$http[method](url, data)
                    .then(response => {

                        if (response.body instanceof Object) {
                            if (response.body.error) {
                                this.swalError({html: response.body.error});
                                reject(response.body.error);
                            } else {
                                resolve(response.body);
                            }

                        } else {
                            lg(response.body);
                            reject(`Unexpected response type - expected object, got ${typeof response.body}`);
                        }
                    })
                    .catch(err => {
                        if (err.status === 403) {
                            this.$store.commit('CLEAR_USER_ID');

                            if (location.hash === '#/login') {
                                // do not redirect if wrong credentials entered from Login page
                                reject(err);
                            } else {
                                this.swalError({title: 'Требуется авторизация!'});
                                location.hash = '#/login';
                            }

                        } else if (err.status === 409) {
                            // in case of simultaneous updates (multi-user or multi-window editing)
                            this.swalError({
                                title: 'Редактируемый объект не найден',
                                text: 'Возможно, он удален другим пользователем!'
                            });
                            resolve(err);

                        } else {
                            throw err;
                        }
                    });
            })
        }
    }
}


