import React, { useState, useEffect } from "react";
import Form, {
    Input,
    Select,
    SwitchList,
} from 'react-form-component'
import date from 'date-and-time';

const prefills = new Map([
    ["today", (self) => date.format(new Date(), 'DD.MM.YYYY')],
    ["all", (self) => self.options],
])

function getPrefillOrNull(id) {
    if (!id) return () => null
    if (!id.startsWith('~')) return () => id
    return prefills.get(id.slice(1)) ?? (() => `error: unkown prefill ${id}`)
}

function addMethodsTo(def) {
    def.getInitial = (...args) => getPrefillOrNull(def.prefill)(def, ...args)
    def.getLabel = () => def.label ?? def.tag
}

function ParamTextShort({ def }) {
    return (
        <Input
            mandatory={true}
            name={def.tag}
            label={def.getLabel()}
            
            initialValue={def.getInitial()}
            inlineLabel={true}
        />
    )
}

function ParamSelectSingle({ def }) {
    const o = def.options
    const initial = def.prefill !== undefined ? o[def.prefill] : o[0]
    return (
        <Select
            mandatory={true}
            name={def.tag}
            label={def.getLabel()}

            inlineLabel={true}

            placeholder={"mandatory"}
            initialValue={initial}
            options={o.slice(0)}
        />
    )
}


function ParamSelectMulti({ def }) {
    const o = def.options
    return (
        <SwitchList
            mandatory={true}
            name={def.tag}
            label={def.getLabel()}

            placeholder={"mandatory"}
            inlineLabel={true}

            initialValue={def.getInitial()}

            options={def.options}
        />
    )
}

export function Parameter({ def }) {
    addMethodsTo(def)
    switch (def.type) {
        case "select-single":
            return (<ParamSelectSingle def={def} />)

        case "select-multi":
            return (<ParamSelectMulti def={def} />)

        case "text-short":
            return (<ParamTextShort def={def} />)

        default:
            return (
                <code> unkown type {def.type} of tag {def.tag} </code>
            )
    }
}