const apiTweets = 'http://localhost:3001/tweets';

export function listTwitters() {

    return fetch(apiTweets)
        .then(res => {
            if(!res.ok) {
                throw new Error('Não foi possível buscar os tweets')
            };
            return res.json();
        })
        .catch(erro => {
            return erro.message;
        })
}