'use server'

import {auth} from "@/lib/auth";
import {headers} from "next/headers";
import {fetchWrapper} from "@/lib/fetch-wrapper";
import {FieldValues} from "react-hook-form";

export async function getAuthTest() {

    return await fetchWrapper<string>('/auctions/test', {
        method: 'POST',
        body: JSON.stringify({})

    })
}

export async function updateListing(values: FieldValues) {

    return await fetchWrapper<void>(`/auctions/${values.id}`, {
        method: 'PUT',
        body: JSON.stringify(values)
    })
}