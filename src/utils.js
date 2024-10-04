export function obMap(ob, callback) {
    if (!ob) return;
    return Object.keys(ob).map(key=>callback(ob[key], key));
}

export function getInitials(name, sep='', limit=2) {
    let parts = name.trim().toUpperCase().split(/\s{1,}/g).map(p=>p[0])
    if (parts.length > limit && limit==2) parts = [parts[0], parts[parts.length-1]]
    return parts.join(sep)
}
  
export function clean(name) {
    let cleaned = name.replace(/\@[^\.]{1,}\.[a-z]{2,}/gi, '').replace(/[^a-z\-\. ]/gi, '')
    cleaned = (cleaned.split(/\s{1,}/g).map((part, index)=>{
        if (!index) return (part.charAt(0).toUpperCase()) + (part.slice(1).toLowerCase())
        return part.charAt(0).toUpperCase()
    }).join('. ').trim()+'.').replace(/\.{2,}$/g, '.')
    if (cleaned.indexOf(' ')==-1 && cleaned.match(/\.$/g)) cleaned = cleaned.replace(/\.$/g, '')
    return cleaned
}
  
export function textToHexColor(str, opacity=false) {
    str = str.replace(/[^a-z]{1,}/gi, '')
    if (!opacity && str.length > 2) str = str.substring(0, 2);
    if (!opacity && str.length > 3) str = str.substring(0, 3);
    if (opacity && str.length > 4) str = str.substring(0, 4);
    const arr1 = []
    for (var n = 0, l = str.length; n < l; n++) {
      const hex = Number(str.charCodeAt(n)).toString(16)
      arr1.push(hex)
    }
    if (arr1.length==2 && !opacity) arr1[1] = arr1[1][0]
    const hex = `#${arr1.join('')}`
    return hex
}

export class SearchParams {
    constructor(data) {
        this.data = data || {};
        this.size = Object.keys(data).length;
        this.get = (key) => {
            return this.data[key];
        };
        this.set = (key, value) => {
            this.data[key] = value;
        };
        this.has = (key) => {
            return this.data[key] !== undefined;
        };
        this.delete = (key) => {
            delete this.data[key];
        };
        this.toString = () => {
            let str = '';
            for (let key in this.data) {
                str += `${key}=${this.data[key]}&`;
            }
            return str.substring(0, str.length - 1);
        };
        this.entries = () => {
            return Object.entries(this.data);
        };
        this.keys = () => {
            return Object.keys(this.data);
        };
        this.values = () => {
            return Object.values(this.data);
        };
        this.append = (key, value) => {
            if (this.data[key] === undefined) {
                this.data[key] = value;
            } else {
                this.data[key] = [this.data[key], value];
            }
        };
        this.getAll = (key) => {
            return this.data[key];
        };
        this.sort = () => {
            let keys = Object.keys(this.data).sort();
            let sorted = {};
            keys.forEach(key => {
                sorted[key] = this.data[key];
            });
            this.data = sorted;
        };
        this.forEach = (callback) => {
            for (let key in this.data) {
                callback(this.data[key], key);
            }
        };
        this.toString = () => {
            let str = '';
            for (let key in this.data) {
                str += `${key}=${this.data[key]}&`;
            }
            return str.substring(0, str.length - 1);
        }
    }
}