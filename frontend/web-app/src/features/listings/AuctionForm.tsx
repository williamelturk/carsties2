'use client'

import {FieldGroup, FieldSet} from "@/components/ui/field";
import {Button} from "@/components/ui/button";
import {FieldValues, useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {useEffect, useTransition} from "react";
import AppTextInput from "@/components/ui/app-text-input";
import {createListings} from "@/features/listings/actions";
import {toast} from "@/components/ui/toast";
import {Auction} from "@/lib/types";
import {toDatetimeLocal} from "@/lib/utils";
import {FetchResult} from "@/lib/fetch-wrapper";
import {updateListing} from "@/features/session/actions";

type Props ={
    auction?: Auction;
    
}
function AuctionForm({auction}:Props) {
    const {control, handleSubmit, reset, setFocus, formState: {isSubmitting, isValid, isDirty}} = useForm();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        setFocus('make')
    }, [setFocus])

    useEffect(() => {
        if(auction) reset({
            ...auction,
            auctionEnd: toDatetimeLocal(auction.auctionEnd)
        });
        
    }, [auction,reset])

    const onSubmit = (data: FieldValues) => {
        const auctionValues = {
            ...data,
            reservePrice: data.reservePrice || 0,
            auctionEnd: new Date(data.auctionEnd).toISOString(),
        }
        
        startTransition(async () => {
            let result: FetchResult<Auction | void>;
            let id = auction?.id ?? null;
            
            if(auction){
                result= await updateListing(auctionValues);
            }else{
                result = await createListings(auctionValues);
                if(result.ok&&result.data) id=result.data.id;
            }
            
            if (!result.ok) {
                toast.add({
                type: "error",
                title:result.status,
                description:result.error
            })
            } else {
                router.push(`/listings/${id}`)
            }
        })
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className='w-full'>
                <FieldGroup>
                    <div className='grid grid-cols-2 gap-4'>
                        <AppTextInput
                            name={'make'} label={'Make of car'} control={control}
                            placeholder={'Make your car'} rules={{required: 'Make is required'}}
                        />
                        <AppTextInput
                            name={'model'} label={'Model of car'} control={control}
                            placeholder={'Testorossa'} rules={{required: 'Model is required'}}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <AppTextInput
                            name={'color'} label={'Color of car'} control={control}
                            placeholder={'red'} rules={{required: 'Color is required'}}
                        />
                        <AppTextInput
                            name={'year'} label={'Year of manufacture'} control={control} type='number'
                            placeholder={'1984'} rules={{required: 'Year is required'}}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <AppTextInput
                            name={'mileage'} label={'How many miles on the clock'} control={control} type='number'
                            placeholder={'1000'} rules={{required: 'Mileage is required'}}
                        />
                        <AppTextInput
                            name={'auctionEnd'} label={'When do you want the auction to finish'} control={control}
                            type='datetime-local'
                            minDate={new Date()}
                            rules={{
                                required: 'Auction en date/time is required',
                                validate: value =>
                                    new Date(value) > new Date() || 'Auction end date must be in the future'
                            }}
                        />
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <AppTextInput
                            name={'reservePrice'} label={'Do you want a reserve price? Leave empty if no reserve'}
                            control={control}
                            type='number' placeholder={'0'}
                        />
                        <AppTextInput
                            name={'imageUrl'} label={'imageUrl of the car'} control={control}
                            placeholder='https://image.com' rules={{required: 'image URL is required'}}
                        />
                    </div>
                    <AppTextInput
                        name='description' label='Description'
                        multiline rows={4} control={control}
                        placeholder='Description of the car'
                        rules={{
                            required: 'Model is required',
                            minLength: {
                                value: 3, message: 'Description > =3'
                            }
                        }}
                    />

                </FieldGroup>
            </FieldSet>
            <div className={"flex justify-end gap-3 mt-4"}>
                <Button onClick={() => router.back()} variant={'outline'}>Cancel</Button>
                <Button
                    variant={'default'}
                    type={'submit'}
                    disabled={isSubmitting || isPending || !isDirty || !isValid}
                >
                    {isPending ? 'Submitting...' : 'Submit'}
                </Button>
            </div>
        </form>
    );
}

export default AuctionForm;