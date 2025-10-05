import {BetEvent as BetLog, DrawEvent as DrawLog,} from "../generated/Order/Order"
import {AutoBetEvent as AutoBet, AutoBetReturnEvent as AutoBetReturn,} from "../generated/AutoBet/AutoBet"
import {PoolAddEvent as PoolAdd, PoolBonusEvent as PoolBonus,} from "../generated/Jackpot/Jackpot"
import {AutoBetEvent, AutoBetReturnEvent, BetEvent, DrawEvent,PoolAddEvent,PoolBonusEvent} from "../generated/schema"
import {timestampToDatetime} from "./utils/constants";
import {BigInt} from "@graphprotocol/graph-ts";

export function handleBetEvent(event: BetLog): void {
    let obj = new BetEvent(createEventID(event.block.number, event.logIndex))
    obj.gameId = event.params.gameId
    obj.autoId = event.params.autoId
    obj.orderId = event.params.orderId
    obj.user = event.params.user
    obj.tokenId = event.params.tokenId
    obj.amount = event.params.amount
    obj.data = event.params.data
    obj.txHash = event.transaction.hash
    obj.timestamp = event.block.timestamp
    obj.utcTime = timestampToDatetime(event.block.timestamp.toI64())
    obj.save()
}

export function handleDrawEvent(event: DrawLog): void {
    let obj = new DrawEvent(createEventID(event.block.number, event.logIndex))
    obj.gameId = event.params.gameId
    obj.orderId = event.params.orderId
    obj.user = event.params.user
    obj.bonus = event.params.bonus
    obj.refund = event.params.refund
    obj.status = event.params.status
    obj.txHash = event.transaction.hash
    obj.timestamp = event.block.timestamp
    obj.utcTime = timestampToDatetime(event.block.timestamp.toI64())
    obj.save()
}

export function handleAutoBetEvent(event: AutoBet): void {
    let obj = new AutoBetEvent(createEventID(event.block.number, event.logIndex))
    obj.autoBetId = event.params.autoBetId
    obj.gameId = event.params.gameId
    obj.user = event.params.user
    obj.totalAmount = event.params.totalAmount
    obj.winThreshold = event.params.winThreshold
    obj.lossThreshold = event.params.lossThreshold
    obj.addWhenWin = event.params.addWhenWin
    obj.addWhenLoss = event.params.add_WhenLoss
    obj.txHash = event.transaction.hash
    obj.timestamp = event.block.timestamp
    obj.utcTime = timestampToDatetime(event.block.timestamp.toI64())
    obj.save()
}

export function handleAutoBetReturnEvent(event: AutoBetReturn): void {
    let obj = new AutoBetReturnEvent(createEventID(event.block.number, event.logIndex))
    obj.autoBetId = event.params.autoBetId
    obj.gameId = event.params.gameId
    obj.amount = event.params.amount
    obj.txHash = event.transaction.hash
    obj.timestamp = event.block.timestamp
    obj.utcTime = timestampToDatetime(event.block.timestamp.toI64())
    obj.save()
}

export function handlePoolAddEvent(event: PoolAdd): void {
    let obj = new PoolAddEvent(createEventID(event.block.number, event.logIndex))
    obj.user = event.params.user
    obj.orderId = event.params.orderId
    obj.amount = event.params.amount
    obj.txHash = event.transaction.hash
    obj.timestamp = event.block.timestamp
    obj.utcTime = timestampToDatetime(event.block.timestamp.toI64())
    obj.save()
}

export function handlePoolBonusEvent(event: PoolBonus): void {
    let obj = new PoolBonusEvent(createEventID(event.block.number, event.logIndex))
    obj.poolId = event.params.poolId
    obj.user = event.params.user
    obj.amount = event.params.amount
    obj.txHash = event.transaction.hash
    obj.timestamp = event.block.timestamp
    obj.utcTime = timestampToDatetime(event.block.timestamp.toI64())
    obj.save()
}

function createEventID(blockNumber: BigInt, logIndex: BigInt): string {
    return blockNumber.toString().concat('-').concat(logIndex.toString())
}


