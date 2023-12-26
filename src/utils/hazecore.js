export default {
    randomText(head) {
        return head + Math.ceil(Math.random() * 10000);
    },
    randomDateTime() {
        let time = new Date().getTime() + Math.ceil(Math.random() * 100000000);
        return new Date(time);
    },
    //获取一个指定范围内的随机整数（结果包括最小值但不包括最大值）
    randomValue(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    curDate(splitStr) {
        if (splitStr == null)
            splitStr = '-';
        let date = new Date();
        let month = date.getMonth() + 1;
        if (month < 10)
            month = '0' + month;
        let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
        return date.getFullYear() + splitStr + month + splitStr + day;
    },
    curDateTime() {
        let date = new Date();
        let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        let min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return this.curDate('-') + ' ' + hour + ':' + min + ':' + sec;
    },
    //将数组对象中的全部对象以逗号方式拼接设置到目标对象中
    arrayToInfo(arrayObj, infoObj) {
        let keys = Object.keys(arrayObj);
        keys.map(item => {
            infoObj[item] = arrayObj[item].join(',');
        });
        return infoObj;
    },
    //传入一个数组对象和一个数据对象，获取数组对象中的数组元素，将数组对象中的数组元素遍历并从数据对象中解析相同属性名的属性值
    parseInfoToArray(arrayObj, infoObj) {
        let keys = Object.keys(arrayObj);
        keys.map(item => {
            if (infoObj[item] != null)
                arrayObj[item] = infoObj[item].split(',');
        });
        return arrayObj;
    },
    //获取距离当前月份几个月之前的日期
    getPrevMonthDate(val) {
        let date = new Date();
        let prevMonTime = date.getTime() - (2678400000 * val);
        return new Date(prevMonTime);
    }
}