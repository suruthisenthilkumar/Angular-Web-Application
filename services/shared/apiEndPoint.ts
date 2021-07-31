export enum apiUrls {
    //------------------token-----------------
    refreshtoken='user/check',
    //-----------------register-------------------
    initialRegistration='register/newManager',
    initialUserCheck="register/check",
    uploadDiagram='register/file',
    getQns='user/getQns',
    raiseNewReq='manager/raiseNewReq',
    //----------------login----------------------
    authorizeRequester='login/emailValidation',
    authorizeAdminLogin='login/admin',
    validatePass='login/passwordValidation',
    deleteSecretKey='user/logout',

    //---------------------get-started-RFI Details-Table--------------------
    getAllDetails='user/getProjects',
    getRFIAns='user/rfians',
    getSMEInfo='Portallead/displaySMEinfo',
    updateProjStatus='Portallead/updateprojectstatus',
    signoffProj='Portallead/signoff',
    allSME='Portallead/allSME',
    assignSME='Portallead/assignSME',
    downloadRFIImage='manager/downloadRFIImage',
    updateRFIAnswer='manager/updaterfians',
    editRFIFile='manager/changeRFIFile',
    createNewTester='Portallead/createTester',
    deleteTester='Portallead/deleteTester',

    //------------------ClientDetails table----------

    getClientInfo='user/clientinfo',
    updateClientInfo='user/updateclientinfo',
    // uploadRFI='manager/updateexcelrfi',

    //-------------------admin----------------

    configDetails='admin/configDetails',
    configCheck='admin/configCheck',
    configUpdate='admin/configUpdate',
    getAllUser="admin/getPHandPL",
    deleteUsers="admin/deleteUser",
    editUsers="admin/editUser",
    createUser="admin/createUser",
    getRFIqn="admin/getQNS",
    updateRFIqn="admin/updateQNS",
    addRFIqn="admin/addQNS",
    deleteQNS="admin/deleteQNS",
}
