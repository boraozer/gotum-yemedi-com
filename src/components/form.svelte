<input type = "text" placeholder = "Konu başlığı"/>
<textarea placeholder = "Paylaşmaktan korktuğunuz şey her neyse buraya çekinmeden yazabilirsin."></textarea>

<button on:click="{handleClick}">
    Dağıtıma çıkar
</button>


<script>
    export let client;

    const database = client.database;

    const entryCollection = database.useCollection('entrys');
    const offersCollection = database.useCollection('entry_offers');


    function handleClick()
    {
        const title = document.querySelector('input').value.trim()
        const content = document.querySelector('textarea').value.trim()

        const documentBody = {
            title : title,
            content : content,
            createDate: new Date(),
            parentDocumentId: null
        }

        const documentId = entryCollection.addDoc(documentBody);

        if(documentId) {
            offersCollection.addDoc({
                entryId : documentId,
                recieverCount : 0,
                destroyRecieveCount : 10
            });
            document.querySelector('input').value = '';
            document.querySelector('textarea').value = '';
            return true;
        }


        alert("Bir şeyleri fazla uzun veya kısa yazmış olabilirsin. Bi bakı ver sana zahmet");
    }

</script>


<style>
    input, textarea {
        width: 100%;
        background: rgb(0 0 0 / 30%);
        border-radius: 4px;
        padding: 0.5rem;
        outline: none;
        color: #f1f1f1;
        border: 1px dashed #585555;
        resize: none;
    }

    button {
        background-color: rgb(0 0 0 / 30%);
        color: #f2f2f2;
        border: 1px solid #333;
        width: 100%;
        border-radius: 4px;
        cursor: pointer;
    }

    button:focus {
        background-color: rgb(0 0 0 / 30%);
    }


    input, textarea, button {
        transition: all ease 0.5s;
    }

    input:hover, textarea:hover, button:hover {
        filter: contrast(0.8);
    }

    textarea {
        height: 200px;
    }
</style>