// noinspection JSAnnotator
const CoreMixin = {

    data: function () {
        return {  }
    },  // Data

    ///////////////////
    methods: {

        //-- Функции для работы с глобальной шиной событий
        getGlobalBus(){
            return this.$root.EventGlobalBus;
        },

        // устанавливаем данные на глобальную шину
        sendEventBusOn(eventName, ...params) {
            var eventGlobalBus = this.getGlobalBus();
            eventGlobalBus.$emit(eventName, ...params);
        },

        // получаем данные с глобальной шины
        getEventBusOn(eventName, callBack) {
            var eventGlobalBus = this.getGlobalBus();
            eventGlobalBus.$on(eventName, (...response) => {
                callBack(...response);
            });
        },

        // устанавливаем данные на глобальную шину
        setEventGlobalBus(eventName, ...params) {
            var eventGlobalBus = this.getGlobalBus();
            eventGlobalBus.$emit(eventName, ...params);
        },

        // получаем данные с глобальной шины
        getEventGlobalBusOn(eventName, callBack) {
            var eventGlobalBus = this.getGlobalBus();
            eventGlobalBus.$on(eventName, (...response) => {
                callBack(...response);
            });
        },

        getHtmlElements(selector) {
            return document.querySelectorAll(selector);
        },

        getHtmlElem(selector) {
            return document.querySelector(selector);
        },

        isNumber(n) { 
            return /^-?[\d.]+(?:e-?\d+)?$/.test(n); 
        }, 

        elementsUpdated(selector, attr, newValue, type = 'style') {
           var oldValue = ''; 
           var elements = this.getHtmlElements(selector);
           for(var i in elements) {
              if(this.isNumber(i)) {
                   let elem =  elements[i]; 
                   if(elem[type][attr]) {
                       oldValue = elem[type][attr] = newValue; 
                       elem[type][attr] = newValue;
                   }      
              }   
           }
           return oldValue; 
        },

        elemUpdated(event, attr, newValue, type = 'style') {
            let target = event.currentTarget;
            var selector = '#' + target.id;
            var el = this.getHtmlElem(selector);
            let oldValue = el[type][attr];
            el[type][attr] = newValue;
            return oldValue;
         },

         selectHtmlElem(elem, rootElemSelector) {
            if(!elem) return false;
            if ( elem.classList.contains('selected') ) return true;

            elem.closest(rootElemSelector)
                .querySelectorAll('.selected')
                .forEach(el => {
                    el.classList.remove('selected')
                });
            elem.classList.add('selected');
         },

         toggleParam(param) {
            return (param) ? param = false : param = true;
         },

         toggleFlag(name) {
            return (this[name]) ? this[name] = false : this[name] = true;
         },

         localStoreInit(key, type = 'get', data = null) {
            var result = [];
            if(type == 'set'){
                var serialObj = JSON.stringify(data); //сериализуем его
                localStorage.setItem(key, serialObj); //запишем его в хранилище по ключу "myKey"
            } else {
                var result = JSON.parse(localStorage.getItem(key)) //спарсим его обратно объек
            }
            return result;
         },

         dialogListiner(event) {
             var elem = event.target;
             inputSelectContainerClose(elem);
             event.preventDefault();
         },

         findArr(arr, value, field = 'id', name = 'name') {
            for(var i in arr) {
                if(arr[i][field] == value) {
                    return arr[i][name];
                }
            }
            return false;
         },

         implementWorkspaceResizing() {

            const MIN_WORKSPACE_TAB_SIZE = 40; // minWidth = minHeight = 40px

            document.querySelectorAll('div.resizable-x').forEach(el => {
                let next = el.nextElementSibling,
                    dragStripe = document.createElement('div');
                dragStripe.className = 'drag-stripe-x';

                dragStripe.onmousedown = e => {
                    document.body.insertAdjacentHTML('afterbegin', '<div style="position: fixed; width: 100%; height: 100%; z-index: 10000; cursor: col-resize"></div>');

                    let startX = e.pageX,
                        startWidth = getExactElemSize(el, 'width'),
                        nextStartWidth = next ? getExactElemSize(next, 'width') : null;

                    document.onmousemove = e => {
                        const shift = e.pageX - startX,
                            stopResizeSelf = shift < -startWidth + MIN_WORKSPACE_TAB_SIZE,
                            stopResizeNext = next && shift > nextStartWidth - MIN_WORKSPACE_TAB_SIZE;

                        if (stopResizeSelf || stopResizeNext) return;

                        el.style.width = startWidth + shift + 'px';
                        if (next) next.style.width = nextStartWidth - shift + 'px';
                    };

                    document.onmouseup = () => {
                        document.onmousemove = document.onmouseup = null;
                        document.body.removeChild(document.body.firstChild);
                    };
                    return false;
                };
                el.appendChild(dragStripe);
            });


            document.querySelectorAll('div.resizable-y').forEach(el => {
                let next = el.nextElementSibling,
                    dragStripe = document.createElement('div');
                dragStripe.className = 'drag-stripe-y';

                dragStripe.onmousedown = e => {
                    document.body.insertAdjacentHTML('afterbegin', '<div style="position: fixed; width: 100%; height: 100%; z-index: 10000; cursor: row-resize"></div>');

                    let startY = e.pageY,
                        startHeight = getExactElemSize(el,'height'),
                        nextStartHeight = next ?  getExactElemSize(next, 'height') : null;

                    document.onmousemove = e => {
                        const shift = e.pageY - startY,
                            stopResizeSelf = shift < -startHeight + MIN_WORKSPACE_TAB_SIZE,
                            stopResizeNext = next && shift > nextStartHeight - MIN_WORKSPACE_TAB_SIZE;

                        if (stopResizeSelf || stopResizeNext) return;

                        el.style.height = startHeight + shift + 'px';
                        if (next) next.style.height = nextStartHeight - shift + 'px';
                    };

                    document.onmouseup = () => {
                        document.onmousemove = document.onmouseup = null;
                        document.body.removeChild(document.body.firstChild);
                    };
                    return false;
                };
                el.appendChild(dragStripe);
            })
        },

    }
    //////  Methods ///

};

export default CoreMixin;