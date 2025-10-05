import {BetPlaced} from "../generated/BetProgram/BetProgram"
import {BetPlacedEvent} from "../generated/schema"

export function handleBetPlaced(event: BetPlaced): void {
    let entity = new BetPlacedEvent(event.transaction.hash.toHex() + "-" + event.logIndex.toString())

    entity.gameId = event.params.gameId
    entity.player = event.params.player
    entity.orderId = event.params.orderId
    entity.amount = event.params.amount
    entity.hash = event.params.hash
    entity.blockNumber = event.block.number
    entity.timestamp = event.block.timestamp
    entity.txHash = event.transaction.hash
    // entity.utcTime = timestampToDatetime(event.block.timestamp.toI64())

    entity.save()
}
