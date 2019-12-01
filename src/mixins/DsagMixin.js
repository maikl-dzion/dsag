import Http from "../services/http";
import CoreMixin from "../mixins/CoreMixin";

const DsagMixin = {
    mixins: [Http, CoreMixin],
    data: function () {
        return {
            className : 'DsagController',
            categoryList : [],
            messagesList : [],
            addressList  : [],
            districtList : [],
            services     : [],
            protocolActions : [],
            performersOrg : [],
        }
    },  // --- Data

    
    methods: {

        getCategoryList(type = 'form') {
            let uri = '/' +this.className+ '/getCategoryList/' + type;
            return this.makeRequest('get', uri);
        },

        getMessagesList(categoryId = 0) {
            let uri = '/' +this.className+ '/getMessageList/' + categoryId;
            return this.makeRequest('get', uri);
        },

        getPerformerItems(messageId = 0, callback = false) {
            const url = '/DsagController/getPerformsData/' + messageId;
            if(!callback) return this.makeRequest('get', url);
            this.makeRequest('get', url).then(resp => { callback(resp); });
        },

        getServices(serviceName = '') {
            const url = '/DsagController/getServicesList/' + serviceName;
            return this.makeRequest('get', url);
        },

        getProtocolActionsData(messageId = '') {
            const url = '/DsagController/getProtocolActionsData/' + messageId;
            return this.makeRequest('get', url);
        },

        responseServices(response) {
            this.services  = response.result;
            this.districtList  = this.services['district_list'];  // районы
            this.addressList   = this.services['address_list'];   // адреса
            this.residentUsers = this.services['resident_users']; // жители
            this.performersOrg = this.services['performers_org']; // исполняющие организации
            this.protocolActions  = this.services['protocol_actions'];   // действия по протоколу
        },

        // getServicesList(setName, getName) {
        //     var url = '/DsagController/getServicesList';
        //     if(!setName)
        //         return this.makeRequest('get', url);
        //
        //     this.makeRequest('get', url)
        //         .then(resp => {
        //             this.servicesList = resp.result;
        //             this[setName] = this.servicesList[getName];
        //         });
        // },

    } // --- Methods 

};

export default DsagMixin;