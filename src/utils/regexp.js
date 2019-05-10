export const emailRule = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/, 'i') // eslint-disable-line
// eslint-disable-next-line no-useless-escape
export const fullnameRule = new RegExp(/^[^\^$,`~.|?!@#%^&*\-+=(){}\\\[\]<>\d]+$/, 'i')

export const phoneRule = new RegExp(/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/, 'i') // eslint-disable-line
