import DsagMixin from "../mixins/DsagMixin";

const MessageEditMixin = {
    mixins: [DsagMixin],
    data: function () {
        return {

            formData: {},
            tabName: 'address',
            districtList : [],
            performers   : [],
            residentUsers: [],
            addressArray: [],
            // selectCategories: [],
            categoryList : [],
            doneWorksContent: '',

            findResidentState: false,
            findAddressState : false,

            // dateFlag1: false,
            // dateFlag2: false,

            dateState : {
                create  : false,
                control : false,
            },

            stateFlags: {
                perform: false
            },

        }
    },  // --- Data

    methods: {

        responseCategory(response, callback = false) {
            this.categoryList = response.result;
            if(callback) callback();
        },

        performDate(param) {
            this.performChangeDate(param, 'date');
        },

        performDateExec(param) {
            this.performChangeDate(param, 'date_exec');
        },

        performChangeDate(param, name) {
            var value = param.value;
            var index = param.name;
            this.performData[index][name] = value;
        },

        // Открываем модальное окно выбора исп / организации
        openPerformOrgs() {
            this.stateFlags.perform = !this.stateFlags.perform;
        },

        //-- Добавляем новую исполняющую организацию
        addPerformOrg(item) {

            let orgId   = item.id;
            let orgName = item.name;
            let messageId = this.formData.id;
            // var newId     = this.performerCreateId(this.performData);

            var perfomModel = {
                'id'      : 0,
                'mess_id' : messageId,
                'date'    : '',
                'read'    : false,
                'control' : false,
                'date_exec'   :  '',
                'performName' :  orgName,
                'performId'   :  orgId,
                'term'  :  '',
                'done_works' :  '',
            };

            this.performData.push(perfomModel);
            this.stateFlags.perform = false;
        },

        // performerCreateId(list, idName = 'id') {
        //     let newId = 0;
        //     for(var i in list) {
        //         if(list[i][idName] > newId) {
        //             newId = list[i][idName];
        //         }
        //     }
        //     return ++newId;
        // },

        save() {
            var postData = this.formData;
            console.log('postData=>');
            console.log(postData);
            this.makeRequest('post', '/DsagController/saveMessage', postData)
                .then(resp => {
                    var result = resp.result
                    this.$emit('after_save_event', result);
                });

            var performData = this.performData;
            console.log('performData=>');
            console.log(performData);
            this.makeRequest('post', '/DsagController/savePerformData', performData)
                .then(resp => {
                    var result = resp.result
                });
        },

        getPerformItem(event, item) {
            let target = event.currentTarget;
            // target.style.backgroundColor = 'red';
            var works = item.done_works;
            this.doneWorksContent = works;
        },

        // setServicesData(resp) {
        //     this.servicesList  = resp;
        //     this.districtList  = this.servicesList['district_list'];
        //     this.addressArray  = this.servicesList['addresses'];      // адреса
        //     this.residentUsers = this.servicesList['resident_users']; // жители
        //     this.performersOrg = this.servicesList['performers_org']; // исполняющие орг.
        //     this.actionTypes   = this.servicesList['action_types'];   // действия по протоколу
        // },

        openDatepicker(name) {
            if (this[name]) this[name] = false;
            else this[name] = true;
        },

        formatDate(date) {
            if (!date) return null;
            // var tmpDate = date.split(" ");
            // const [year, month, day] = tmpDate[0].split(".");
            const [year, month, day] = date.split("-");
            return `${day}.${month}.${year}`;
        },

        logger(v) {
            this._date = v;
            console.log(v);
        },

        // findResident() {
        //     if (this.findResidentState) this.findResidentState = false;
        //     else this.findResidentState = true;
        // },

        // findAddress() {
        //     if (this.findAddressState) this.findAddressState = false;
        //     else this.findAddressState = true;
        // },

        tabToggle(event, tabName) {
            var target = event.target;
            // var elem  = window.document.querySelector(event);
            $(".tabsActionButton").css({
                background: "white",
                border: "1px grey solid"
            });

            target.style.backgroundColor = "#D6D3CE";
            target.style.borderTop = "2px blue solid";
            this.tabName = tabName;
            event.preventDefault();
        },

        formDataFormat(itemMessage) {
            for (var fName in itemMessage) {
                var item = itemMessage[fName];
                //if(this.formData[fName]) {
                this.formData[fName] = item;
            }
            return this.formData;
        }

    } // --- Methods

};

export default MessageEditMixin;