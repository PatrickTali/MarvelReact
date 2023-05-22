let token = `ab7cb08a754117d75a3ebfaf573113372afffae23c664b31`

export const serverCalls = {
    get: async () => {
        const response = await fetch(`https://magnificentmarvel114.glitch.me/api/characters`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }

        return await response.json()
    },

    create: async(data: any = {}) => {
        const response = await fetch(`https://magnificentmarvel114.glitch.me/api/characters`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if(!response.ok){
            throw new Error('Failed to Create new data on server')
        }

        return await response.json()
    },
    update: async (id:string, data:any = {}) => {
        const response = await fetch(`https://magnificentmarvel114.glitch.me/api/characters/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to Create new data on server')
        }

        console.log(`successfully update car with id ${id}`)
    },
    delete: async(id:string) => {
        const response = await fetch(`https://magnificentmarvel114.glitch.me/api/characters/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to delete data')
        }
    }
}