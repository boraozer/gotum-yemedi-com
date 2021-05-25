import {foxql} from 'foxql';

const client = new foxql();

client.listenEvents([
    'onOfferedDocuments'
])


client.openNativeCollections();

client.open();

client.peer.socket.emit('call', 10);

setInterval(()=>{
    client.peer.socket.emit('call', 10);
},1250);

export default client;

