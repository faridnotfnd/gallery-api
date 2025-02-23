import NodeCache from 'node-cache';

// stdTTL: waktu cache dalam detik (default 1 jam)
const cache = new NodeCache({ stdTTL: 3600 });

export default cache;