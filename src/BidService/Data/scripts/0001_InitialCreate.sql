CREATE TABLE IF NOT EXISTS auctions (
    id text PRIMARY KEY,
    auctionEnd timestamp without time zone NOT NULL,
    seller text NOT NULL,
    reservePrice integer NOT NULL,
    finished boolean NOT NULL default false
);

CREATE TABLE IF NOT EXISTS bids (
    id text PRIMARY KEY,
    auctionId text NOT NULL,
    bidder text NOT NULL,
    bidTime timestamp without time zone NOT NULL,
    amount integer NOT NULL,
    bidStatus integer NOT NULL
);

ALTER TABLE public.bids
    RENAME COLUMN actual_misspelled_name TO bidstatus;

CREATE INDEX IF NOT EXISTS ix_bids_auctionId ON bids (auctionId);