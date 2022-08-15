import i18next from "i18next";

// retrieves all variable placeholder names as tuple
type Keys<S extends string> = S extends '' ? [] :
    S extends `${infer _}{{${infer B}}}${infer C}` ? [B, ...Keys<C>] : never

// substitutes placeholder variables with input values
type Interpolate<S extends string, I extends Record<Keys<S>[number], string>> =
    S extends '' ? '' :
    S extends `${infer A}{{${infer B}}}${infer C}` ?
    `${A}${I[Extract<B, keyof I>]}${Interpolate<C, I>}`
    : never

// Example
type Dict = { "key": "yeah, {{what}} is {{how}}" }
type KeysDict = Keys<Dict["key"]> // type KeysDict = ["what", "how"]
type I1 = Interpolate<Dict["key"], { what: 'i18next', how: 'great' }>;
// type I1 = "yeah, i18next is great"

// implementation omitted here
declare function t<
    K extends keyof Dict,
    I extends Record<Keys<Dict[K]>[number], string>
>(k: K, args: I): Interpolate<Dict[K], I>

const ret = t('key', { what: 'i18next', how: 'great' } as const);
// const ret: "yeah, i18next is great"

t("")

i18next.init({
})