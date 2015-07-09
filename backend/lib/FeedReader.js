var events = require('events');
var FeedParser = require('feedparser');
var request = require('request');

export default class FeedReader extends events.EventEmitter {

    constructor( feedUrl ) {
        super();
        this.feedParser = new FeedParser();
        this.items = [];
        this.feedRequest = null;
        this.feedUrl = feedUrl;
        this.meta = null;
    }


    /**
     *  starts fetching / reading the feed
     * @param url [optional]  the feed url
     */
    read( url ) {
        if( url ) this.feedUrl = url;
        this.feedRequest =  request(this.feedUrl);

        this.feedRequest.on('error', this.onError.bind(this) );
        this.feedParser.on('error', this.onError.bind(this) );

        this.feedRequest.on('response', this.onRequestResponse.bind(this) );
        this.feedParser.on('readable', this.onGetData.bind(this) );
        this.feedParser.on('end', this.onEndReading.bind(this) );
    }

    onRequestResponse( response ) {
        if( response.statusCode != 200 ) return this.emit('error', new Error('Bad Status Code : '+response.statusCode ));
        this.feedRequest.pipe(this.feedParser);
    }

    onGetData() {
        var item;
        if( this.meta == null ) {
            this.meta = this.feedParser.meta;
            this.emit('meta', this.meta );
        }
        while( item = this.feedParser.read() ) {
            this.items.push(item);
        }
    }

    onError(data) {
        console.log('error : ',data);
        this.emit('error', data);
    }

    onEndReading() {
        this.emit('end', {
            meta: this.feedParser.meta,
            items: this.items
        });
    }

}
