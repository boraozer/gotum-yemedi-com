import {foxql} from 'foxql';

const client = new foxql();

client.listenEvents([
    'onOfferedDocuments'
])


client.openNativeCollections();

client.open();

export default client;

