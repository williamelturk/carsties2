import {getListingsDetails} from "@/features/listings/actions";
import NotFound from "next/dist/client/components/builtin/not-found";
import CountdownTimer from "@/features/listings/CountdownTimer";
import CardImage from "@/features/listings/CardImage";
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import MetaCard from "@/features/listings/details/MetaCard";
import {getCurrentUser} from "@/lib/auth";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import DeleteButton from "@/features/listings/details/deleteButton";

async function ListingDetailedPage(props: PageProps<"/listings/[id]">) {
    const user = await getCurrentUser();
    const {id} = await props.params;
    const result = await getListingsDetails(id)

    if (!result.ok && result.status === 404) return NotFound();
    if (!result.ok) throw new Error(result.error)
    const {data:auction} = result;

    return (
        <div className={'flex flex-col'}>
            <div className={'flex justify-between'}>
                <div className={'flex items-center gap-3'}>
                    <h3 className={'text-2xl font-semibold'}>
                        {auction.make} {auction.model}
                    </h3>
                    {user?.username === auction.seller && (
                        <>
                            <Link href={`${auction.id}/edit`}
                                  className={buttonVariants({variant: 'outline'})}
                            >
                                Edit listing
                            </Link>
                            <DeleteButton auction={auction}/>
                        </>
                    )}

                </div>
                <div className={'flex items-center gap-3'}>
                    <span className={'text-muted-foreground uppercase'}>
                        Time remaining
                    </span>
                    <CountdownTimer auctionEnd={auction.auctionEnd}/>
                </div>
            </div>
            <div className={'flex gap-6 mt-3'}>
                <div className={'flex w-1/2 flex-col'}>
                    <CardImage imageUrl={auction.imageUrl} thumbnail={false}/>
                    <div className={'flex flex-col gap-3 mt-3'}>
                        <div className={'flex gap-3'}>
                            <MetaCard label={'Mileage'} value={auction.mileage}/>
                            <MetaCard label={'Color'} value={auction.color}/>
                            <MetaCard label={'Year'} value={auction.year}/>
                            <MetaCard label={'Seller'} value={auction.seller}/>
                        </div>
                        <MetaCard label={'Description'} value={auction.description}/>
                    </div>
                </div>
                <div className={'flex w-1/2 flex-col'}>
                    <Card className={'max-h-[80vh]'}>
                        <CardHeader>
                            <CardTitle>Bid panel</CardTitle>
                            <CardDescription>Comming soon...</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default ListingDetailedPage;