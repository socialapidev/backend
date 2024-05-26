async function getMetaBusinessAccounts(userId, token){
    try {
        // Fetch User Businesses
        const response = await fetch(`${process.env.META_BASELINE_URL}/${process.env.META_API_VERSION}/${userId}/businesses?fields=instagram_business_accounts{name,id,username,ig_id},name,id&limit=1000`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            })
        })

        if(!response.ok){
            console.log(response)
            return null
        }

        const data = await response.json()

        // Filter Data
        const filtered = data.data.filter((obj) => (obj.instagram_business_accounts !== undefined ))

        return filtered

    } catch(err) {
        console.log(err)
        return null
    }
}

module.exports = {
    getMetaBusinessAccounts
}