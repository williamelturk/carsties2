import {Card, CardContent, CardTitle, CardDescription, CardHeader} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import AuctionForm from "@/features/listings/AuctionForm";

function CreatePage() {
    return (
        <Card className='w-3/4 mx-auto'>
            <CardHeader className='text-2xl font-semibold'>
                <CardTitle>Sell your car</CardTitle>
                <CardDescription>Fill out the following form to sell your car</CardDescription>
            </CardHeader>
            <Separator/>
            <CardContent>
                <AuctionForm/>
            </CardContent>
        </Card>

    );
}

export default CreatePage;