


const { axiosClient } = require('./axioshelpers');

async function graphRoleReq (token, data,entity) {

    var options = {
        responseType: 'json',
        "method": "patch",
        url:`${token.resource}/v1.0/myorganization/applications/${entity}`,
        headers:{
            'content-type':"application/json",
            authorization:"bearer " + token.token
        },
        data,
    }

    console.log(options)
    var data = await axiosClient(options).catch((error) => {
        return Promise.reject(error?.response?.data?.error)
    })

return data?.data || data

}

async function graphappRoleAssignments (token, data,entity) {

    var options = {
        responseType: 'json',
        "method": "post",
        url:`${token.resource}/v1.0/servicePrincipals/${entity}/appRoleAssignments`,
        headers:{
            'content-type':"application/json",
            authorization:"bearer " + token.token
        },
        data,
    }

options
var data = await axiosClient(options).catch((error) => {
    return Promise.reject(error)    
})

return data?.data || data

}

async function graphAddspn (token, data) {

        var options = {
            responseType: 'json',
            "method": "post",
            url:`${token.resource}/v1.0/servicePrincipals`,
            headers:{
                'content-type':"application/json",
                authorization:"bearer " + token.token
            },
            data,
        }

    options
    var data = await axiosClient(options).catch((error) => {
        return Promise.reject(error)    
    })

    return data?.data || data

}


async function graphDelete (token, type) {

    var options = {
        responseType: 'json',
        "method": "delete",
        url:`${token.resource}/v1.0/${type}`,
        headers:{
            'content-type':"application/json",
            authorization:"bearer " + token.token
        },
    }

options
var data = await axiosClient(options).catch((error) => {
    return Promise.reject(error?.response?.data?.error)
})

return data?.data


}

async function graphAddApp (token, data) {

    var options = {
        responseType: 'json',
        "method": "post",
        url:`${token.resource}/v1.0/applications`,
        headers:{
            'content-type':"application/json",
            authorization:"bearer " + token.token
        },
      data,
    }

options
var data = await axiosClient(options).catch((error) => {
    return Promise.reject(error?.response?.data?.error)
})

return data?.data

}



async function graphDeltaLink (token, operation) {

    console.log('checking', operation)

        var options = {
            responseType: 'json',
            "method": "get",
            url:`${token.resource}/v1.0/${operation}`,
            headers:{
                'content-type':"application/json",
                authorization:"bearer " + token.access_token
            },
          /*   timeout:2000 */
        }

    options
    var {data} = await axiosClient(options).catch((error) => {
        return Promise.reject(error)
    })

    return data["@odata.nextLink"] || data

}


async function graph (token, operation) {

    console.log('checking', operation)

        var options = {
            responseType: 'json',
            "method": "get",
            url:`${token.resource}/v1.0/${operation}`,
            headers:{
                'content-type':"application/json",
                authorization:"bearer " + token.access_token
            },
          /*   timeout:2000 */
        }

    options
    var data = await axiosClient(options).catch((error) => {
        return Promise.reject(error)
    })

    return data?.data?.value || data

}

async function graphCreate (token, operation,data) {

    console.log('checking', operation)

        var options = {
            responseType: 'json',
            "method": "post",
            url:`${token.resource}/v1.0/${operation}`,
            headers:{
                'content-type':"application/json",
                authorization:"bearer " + token.token
            },
          data
        }

    options
    var data = await axiosClient(options).catch((error) => {
        return Promise.reject(error?.response?.data?.error)
    })

    return data?.data || data

}




async function graphRole (token, url) {

    console.log('checking')

        var options = {
            responseType: 'json',
            "method": "get",
            url,
            headers:{
                'content-type':"application/json",
                authorization:"bearer " + token.access_token
            },
          /*   timeout:2000 */
        }


    var {data}= await axiosClient(options).catch((error) => {
        return Promise.reject(error)
    })

    return {
        changes:data?.value || "",
        state:data["@odata.deltaLink"]
    }

}


async function graphList (token, operation, skiptoken, responseCollector) {

        var options = {
            responseType: 'json',
            "method": "get",
            url:operation,
            headers:{
                'content-type':"application/json",
                authorization:"bearer " + token
            }
        }
    
        if (skiptoken) {
            options.url = skiptoken
        }

    var {data} = await axiosClient(options).catch((error) => {
        return Promise.reject(error)
    })


    if (data['@odata.nextLink']) {
        data.value.forEach((item) => responseCollector.data.push(item))
        console.log(data['@odata.nextLink'])
        await graphList(token,operation,data['@odata.nextLink'],responseCollector)

    }

    else {
        data.value.forEach((item) => responseCollector.data.push(item))
       responseCollector.delta = data["@odata.deltaLink"]
    }

}

module.exports={graph, graphRole, graphList, graphAddApp, graphAddspn,graphDelete,graphappRoleAssignments, graphCreate,graphDeltaLink}
