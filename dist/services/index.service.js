"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.SubCategory = exports.Skill = exports.Project = exports.Organization = exports.Media = exports.Contact = exports.Category = exports.Blog = void 0;
const lodash = require("lodash");
const fs = require("fs");
const getURL = (url) => {
    return `./public/data/${url}.json`;
};
const getData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const path = getURL(url);
    const rawData = yield fs.readFileSync(path);
    return JSON.parse(rawData);
});
const updateData = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    const path = getURL(url);
    yield fs.writeFileSync(path, JSON.stringify(data), function (err) {
        if (err)
            throw err;
    });
});
function count_element_in_array(array, x) {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == x.id)
            count++;
    }
    return count;
}
// *******************Method**********************
const findAll = (url, obj) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData(url);
    let dataFirst = [...data];
    if (obj) {
        const { where, include } = obj;
        if (include) {
            let resultIn = [];
            for (let i = 0; i < dataFirst.length; i++) {
                for (let index = 0; index < include.length; index++) {
                    const { model, as, map } = include[index];
                    const objItem = {
                        where: {
                            key: "id",
                            value: dataFirst[i][map],
                        },
                    };
                    if (include[index].include) {
                        objItem.include = include[index].include;
                    }
                    if (include[index].where) {
                        objItem.where = include[index].where;
                    }
                    dataFirst[i][as] = yield model.findOne(objItem);
                }
                resultIn.push(dataFirst[i]);
            }
            dataFirst = [...resultIn];
        }
        let result = [...dataFirst];
        if (where) {
            const { key, value, like, or, and } = where;
            let dataSecond;
            if (or || and) {
                if (or) {
                    dataSecond = [];
                    for (let ixd = 0; ixd < or.length; ixd++) {
                        if (include) {
                            or[ixd].include = include;
                        }
                        if (and) {
                            or[ixd].where.and = and;
                        }
                        const asc = yield findAll(url, or[ixd]);
                        lodash.map(asc, (v) => {
                            const pos = dataSecond.findIndex((b) => b.id === v.id);
                            if (pos === -1) {
                                dataSecond.push(v);
                            }
                            return v;
                        });
                    }
                    result = [...dataSecond];
                }
                if (and) {
                    dataSecond = [];
                    for (let ixd = 0; ixd < and.length; ixd++) {
                        if (include) {
                            and[ixd].include = include;
                        }
                        if (or) {
                            and[ixd].where.or = or;
                        }
                        const asc = yield findAll(url, and[ixd]);
                        dataSecond.push(...asc);
                    }
                    let resultF = [];
                    lodash.map(dataSecond, (f) => {
                        if (count_element_in_array(dataSecond, f) >= and.length) {
                            const pos = resultF.findIndex((b) => b.id === f.id);
                            if (pos === -1) {
                                resultF.push(f);
                            }
                        }
                        return f;
                    });
                    result = [...resultF];
                }
            }
            else {
                result = lodash.filter(dataFirst, (i) => {
                    // Convert key object
                    let ckey = i;
                    if (key.includes(".")) {
                        let keyF = key.split(".");
                        for (let i = 0; i < keyF.length; i++) {
                            ckey = ckey[keyF[i]];
                        }
                    }
                    else {
                        ckey = i[key];
                    }
                    // Check compare equal or like
                    if (like) {
                        return ckey
                            .toString()
                            .toLowerCase()
                            .includes(value.toString().toLowerCase());
                    }
                    else {
                        return ckey == value;
                    }
                });
            }
        }
        return result;
    }
    else {
        return data;
    }
});
const findOne = (url, obj) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData(url);
    const { where, include } = obj;
    const { key, value, like, or, and } = where;
    let itemFound, dataSecond;
    if (or || and) {
        if (or) {
            dataSecond = [];
            for (let ixd = 0; ixd < or.length; ixd++) {
                if (and) {
                    or[ixd].where.and = and;
                }
                const asc = yield findAll(url, or[ixd]);
                lodash.map(asc, (v) => {
                    const pos = dataSecond.findIndex((b) => b.id === v.id);
                    if (pos === -1) {
                        dataSecond.push(v);
                    }
                    return v;
                });
            }
            itemFound = lodash.first(dataSecond);
        }
        if (and) {
            dataSecond = [];
            for (let ixd = 0; ixd < and.length; ixd++) {
                if (or) {
                    and[ixd].where.or = or;
                }
                const asc = yield findAll(url, and[ixd]);
                dataSecond.push(...asc);
            }
            let resultF = [];
            lodash.map(dataSecond, (f) => {
                if (count_element_in_array(dataSecond, f) >= and.length) {
                    const pos = resultF.findIndex((b) => b.id === f.id);
                    if (pos === -1) {
                        resultF.push(f);
                    }
                }
                return f;
            });
            itemFound = resultF.length ? lodash.first(resultF) : null;
        }
    }
    else {
        if (like) {
            itemFound = lodash.find(data, (i) => {
                return i[key].toString().toLowerCase().includes(value.toString().toLowerCase());
            });
        }
        else {
            itemFound = lodash.find(data, (i) => i[key] == value);
        }
    }
    if (itemFound) {
        if (include) {
            let item;
            for (let i = 0; i < include.length; i++) {
                const { model, as, map } = include[i];
                const objItem = {
                    where: {
                        key: "id",
                        value: itemFound[map],
                    },
                };
                if (include[i].include) {
                    objItem.include = include[i].include;
                }
                itemFound[as] = yield model.findOne(objItem);
                item = Object.assign({}, itemFound);
            }
            return Object.assign({}, item);
        }
        return itemFound;
    }
    else {
        return {
            message: "Find by ID",
            content: "Not found by ID",
        };
    }
});
const destroy = (url, obj) => __awaiter(void 0, void 0, void 0, function* () {
    const { where } = obj;
    if (where) {
        const { key, value, or } = where;
        if (or) {
            for (let ixd = 0; ixd < or.length; ixd++) {
                yield destroy(url, or[ixd]);
            }
            return;
        }
        else {
            const data = yield getData(url);
            const result = lodash.filter(data, (i) => i[key] != value);
            yield updateData(url, result);
            return;
        }
    }
});
const create = (url, item) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData(url);
    const elm = Object.assign(Object.assign({}, item), { id: Math.floor(Math.random() * 10000), createdAt: new Date(), updatedAt: new Date() });
    data.push(elm);
    yield updateData(url, data);
    return elm;
});
const update = (url, id, item) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield getData(url);
    const index = lodash.findIndex(data, (i) => i.id == id);
    if (index !== -1) {
        const updated = data[index];
        data[index] = Object.assign(Object.assign(Object.assign({}, updated), item), { updatedAt: new Date() });
        yield updateData(url, data);
        return data[index];
    }
    else {
        return {
            message: "Find by ID",
            content: "Not found by ID",
        };
    }
});
exports.Blog = {
    findAll: (obj) => findAll("blog", obj),
    findOne: (obj) => findOne("blog", obj),
    destroy: (obj) => destroy("blog", obj),
    create: (item) => create("blog", item),
    update: (id, item) => update("blog", id, item),
};
exports.Category = {
    findAll: (obj) => findAll("category", obj),
    findOne: (obj) => findOne("category", obj),
    destroy: (obj) => destroy("category", obj),
    create: (item) => create("category", item),
    update: (id, item) => update("category", id, item),
};
exports.Contact = {
    findAll: (obj) => findAll("contact", obj),
    findOne: (obj) => findOne("contact", obj),
    destroy: (obj) => destroy("contact", obj),
    create: (item) => create("contact", item),
    update: (id, item) => update("contact", id, item),
};
exports.Media = {
    findAll: (obj) => findAll("media", obj),
    findOne: (obj) => findOne("media", obj),
    destroy: (obj) => destroy("media", obj),
    create: (item) => create("media", item),
    update: (id, item) => update("media", id, item),
};
exports.Organization = {
    findAll: (obj) => findAll("organization", obj),
    findOne: (obj) => findOne("organization", obj),
    destroy: (obj) => destroy("organization", obj),
    create: (item) => create("organization", item),
    update: (id, item) => update("organization", id, item),
};
exports.Project = {
    findAll: (obj) => findAll("project", obj),
    findOne: (obj) => findOne("project", obj),
    destroy: (obj) => destroy("project", obj),
    create: (item) => create("project", item),
    update: (id, item) => update("project", id, item),
};
exports.Skill = {
    findAll: (obj) => findAll("skill", obj),
    findOne: (obj) => findOne("skill", obj),
    destroy: (obj) => destroy("skill", obj),
    create: (item) => create("skill", item),
    update: (id, item) => update("skill", id, item),
};
exports.SubCategory = {
    findAll: (obj) => findAll("subCategory", obj),
    findOne: (obj) => findOne("subCategory", obj),
    destroy: (obj) => destroy("subCategory", obj),
    create: (item) => create("subCategory", item),
    update: (id, item) => update("subCategory", id, item),
};
exports.User = {
    findAll: (obj) => findAll("user", obj),
    findOne: (obj) => findOne("user", obj),
    destroy: (obj) => destroy("user", obj),
    create: (item) => create("user", item),
    update: (id, item) => update("user", id, item),
};
