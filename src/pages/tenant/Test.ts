import { FormItemMixture } from "@/ui/interface"


export const optionList = [
    { value: 1, label: '个人开发者' },
    { value: 2, label: '企业用户' },
]

export const inputInfo: FormItemMixture<'input'> = {
    type: 'input',
    itemProps: {
        name: 'custom_input',
        label: 'INPUT',
        rules: [{ required: true, message: 'input...' }]
    },
    elementProps: {
        placeholder: 'please input your name...'
    }
}

export const selectInfo: FormItemMixture<'select'> = {
    type: 'select',
    itemProps: {
        name: 'custom_select',
        label: 'SELECT',
        rules: [{ required: true, message: 'select...' }]
    },
    elementProps: {
        options: optionList
    }
}