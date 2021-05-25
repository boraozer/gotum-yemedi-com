
{#if documents.length <= 0}

    <div class = "information-box" in:fade>

        <p>Paylaşmaktan korktuğun şeyleri bu sayfada ki formu kullanarak <b>foxql</b> ağı üzerinde dağıtıma çıkar. </p>

        <p>
            Eğer insanlar paylaştığın şeyden hoşlanırlarsa senin düşünceni başka insanlara aktarmaya devam ederler. 
        </p>

        <p>
            Paylaşımın <b>10 kişiye</b> dağıtıldıktan sonra ağ üzerinden iz bırakmadan yok olacak.
        </p>

    </div>

{/if}

{#if documents.length > 0} 

    {#each documents as doc}


        <div class = "entry" in:fade>
            <div class = "title">
                {doc.title}
            </div>
            <div class = "content">
                {doc.content}
            </div>
            <div class = "stats">
                {doc.recieverCount} / {doc.destroyRecieveCount}
            </div>

        </div>

    {/each}

{/if}


<script>
    export let client;
    import { fade } from 'svelte/transition'

    let documents = [];

    function loadDocuments() {
        
        let founds = [];

        const database = client.database;

        const entryCollection = database.useCollection('entrys');
        const offersCollection = database.useCollection('entry_offers');

        Object.values(entryCollection.documents).forEach( doc => {
            const documentId = doc.documentId;

            const findOfferIndexs = offersCollection.indexs.entryId[documentId] ?? false;

            if(!findOfferIndexs){
                offersCollection.deleteDoc(documentId)
                return false;
            }

            const offerDoc = offersCollection.getDoc(Object.keys(
                findOfferIndexs
            )[0])

            if(offerDoc.destroyRecieveCount <= offerDoc.recieverCount) {
                offersCollection.deleteDoc(offerDoc.entryId);
                entryCollection.deleteDoc(documentId)
            }


            const mergeDocuments = JSON.parse(JSON.stringify({
                ...doc,
                ...offerDoc
            }))

            founds.push(mergeDocuments);
        });

        documents = founds;

    }

    setInterval(() => {
        loadDocuments();
    }, 500);
 

</script>


<style>
    .information-box {
        text-align: left;
    }

    .information-box p{
        background: rgb(0, 0, 0, 0.5);
        margin-bottom: 0.5rem;
        padding: 1rem;
        border-radius: 4px;
    }

    .entry {
        text-align: left;
        box-sizing: border-box;
        padding: 0.5rem;
        background: rgb(0 0 0 / 30%);
        margin-bottom: 0.4rem;
    }

    .entry .title {
        padding: 0.5rem;
        font-size: 1.3rem;
        font-weight: 600;
    }

    .entry .content {
        padding: 0.5rem;    
    }

    .entry .stats {
        padding: 0.25rem 1rem;
        background: #d24a1e;
        border-radius: 30px;
        display: inline-block;
        font-size: 0.8rem;
    }
</style>