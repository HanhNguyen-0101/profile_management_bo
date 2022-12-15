const lodash = require("lodash");
const fs = require("fs");

const getURL = (url: string) => {
  return `./public/data/${url}.json`;
};
const getData = async (url: string) => {
  const path = getURL(url);
  const rawData = await fs.readFileSync(path);
  return JSON.parse(rawData);
};
const updateData = async (url: string, data: any) => {
  const path = getURL(url);
  await fs.writeFileSync(path, JSON.stringify(data), function (err: any) {
    if (err) throw err;
  });
};
function count_element_in_array(array: Array<any>, x: any) {
  let count = 0;
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == x.id) count++;
  }
  return count;
}

// *******************Method**********************
const findAll = async (
  url: string,
  obj: { where: any; include: Array<any> }
) => {
  const data = await getData(url);
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
          dataFirst[i][as] = await model.findOne(objItem);
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
            const asc = await findAll(url, or[ixd]);
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
            const asc = await findAll(url, and[ixd]);
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
      } else {
        result = lodash.filter(dataFirst, (i) => {
          // Convert key object
          let ckey = i;
          if (key.includes(".")) {
            let keyF = key.split(".");
            for (let i = 0; i < keyF.length; i++) {
              ckey = ckey[keyF[i]];
            }
          } else {
            ckey = i[key];
          }

          // Check compare equal or like
          if (like) {
            return ckey
              .toString()
              .toLowerCase()
              .includes(value.toString().toLowerCase());
          } else {
            return ckey == value;
          }
        });
      }
    }
    return result;
  } else {
    return data;
  }
};

const findOne = async (url, obj) => {
  const data = await getData(url);
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
        const asc = await findAll(url, or[ixd]);
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
        const asc = await findAll(url, and[ixd]);
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
  } else {
    if (like) {
      itemFound = lodash.find(data, (i) =>
        i[key].toString.toLowerCase().includes(value.toString().toLowerCase())
      );
    } else {
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
        itemFound[as] = await model.findOne(objItem);
        item = { ...itemFound };
      }
      return { ...item };
    }
    return itemFound;
  } else {
    return {
      message: "Find by ID",
      content: "Not found by ID",
    };
  }
};

const destroy = async (url: string, obj: { where: any }) => {
  const { where } = obj;
  if (where) {
    const { key, value, or } = where;
    if (or) {
      for (let ixd = 0; ixd < or.length; ixd++) {
        await destroy(url, or[ixd]);
      }
      return;
    } else {
      const data = await getData(url);
      const result = lodash.filter(data, (i: any) => i[key] != value);
      await updateData(url, result);
      return;
    }
  }
};
const create = async (url: string, item: any) => {
  const data = await getData(url);
  const elm = {
    ...item,
    id: Math.floor(Math.random() * 10000),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  data.push(elm);
  await updateData(url, data);
  return elm;
};
const update = async (url: string, id: number | string, item: any) => {
  const data = await getData(url);
  const index = lodash.findIndex(data, (i: any) => i.id == id);
  if (index !== -1) {
    const updated = data[index];
    data[index] = {
      ...updated,
      ...item,
      updatedAt: new Date(),
    };
    await updateData(url, data);
    return data[index];
  } else {
    return {
      message: "Find by ID",
      content: "Not found by ID",
    };
  }
};

export const Blog = {
  findAll: (obj: any) => findAll("blog", obj),
  findOne: (obj: any) => findOne("blog", obj),
  destroy: (obj: any) => destroy("blog", obj),
  create: (item: any) => create("blog", item),
  update: (id: number | string, item: any) => update("blog", id, item),
};

export const Category = {
  findAll: (obj: any) => findAll("category", obj),
  findOne: (obj: any) => findOne("category", obj),
  destroy: (obj: any) => destroy("category", obj),
  create: (item: any) => create("category", item),
  update: (id: number | string, item: any) => update("category", id, item),
};
export const Contact = {
  findAll: (obj: any) => findAll("contact", obj),
  findOne: (obj: any) => findOne("contact", obj),
  destroy: (obj: any) => destroy("contact", obj),
  create: (item: any) => create("contact", item),
  update: (id: number | string, item: any) => update("contact", id, item),
};
export const Media = {
  findAll: (obj: any) => findAll("media", obj),
  findOne: (obj: any) => findOne("media", obj),
  destroy: (obj: any) => destroy("media", obj),
  create: (item: any) => create("media", item),
  update: (id: number | string, item: any) => update("media", id, item),
};
export const Organization = {
  findAll: (obj: any) => findAll("organization", obj),
  findOne: (obj: any) => findOne("organization", obj),
  destroy: (obj: any) => destroy("organization", obj),
  create: (item: any) => create("organization", item),
  update: (id: number | string, item: any) => update("organization", id, item),
};
export const Project = {
  findAll: (obj: any) => findAll("project", obj),
  findOne: (obj: any) => findOne("project", obj),
  destroy: (obj: any) => destroy("project", obj),
  create: (item: any) => create("project", item),
  update: (id: number | string, item: any) => update("project", id, item),
};
export const Skill = {
  findAll: (obj: any) => findAll("skill", obj),
  findOne: (obj: any) => findOne("skill", obj),
  destroy: (obj: any) => destroy("skill", obj),
  create: (item: any) => create("skill", item),
  update: (id: number | string, item: any) => update("skill", id, item),
};
export const SubCategory = {
  findAll: (obj: any) => findAll("subCategory", obj),
  findOne: (obj: any) => findOne("subCategory", obj),
  destroy: (obj: any) => destroy("subCategory", obj),
  create: (item: any) => create("subCategory", item),
  update: (id: number | string, item: any) => update("subCategory", id, item),
};
export const User = {
  findAll: (obj: any) => findAll("user", obj),
  findOne: (obj: any) => findOne("user", obj),
  destroy: (obj: any) => destroy("user", obj),
  create: (item: any) => create("user", item),
  update: (id: number | string, item: any) => update("user", id, item),
};
