'use client'

import {useRouter} from "next/navigation";
import {Card} from "@/components/ui/card";
import {CarFront} from "lucide-react";
import {Button} from "@/components/ui/button";

type Props = {
    title?: string;
    subTitle?: string;
    showReset?: boolean;
}

function EmptyState({
    title = "No matches for this search",
    subTitle = "Try changing the filters or reseting them",
    showReset = true
}: Props) {
    const router = useRouter();
    
    return (
        <Card className={'h-[50vh] w-1/2 flex flex-col gap-3 justify-center items-center text-center'}>
            <CarFront className="h-28 w-28" />
            <h2 className={'text-2xl font-semibold'}>{title}</h2>
            <p className={'text-muted-foreground'}>{subTitle}</p>
            {showReset && (
                <Button onClick={()=> router.push('/')} className={'mt-2'}>
                    Reset Filters
                </Button>
            )}
        </Card>
    );
}

export default EmptyState;