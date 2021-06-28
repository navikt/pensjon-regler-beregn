package nais

import io.swagger.v3.oas.annotations.Operation
import org.graalvm.compiler.word.Word
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
open class NaisController {
    @GetMapping("/isAlive")
    fun isAlive(): ResponseEntity<Any> {
        return ResponseEntity(HttpStatus.OK)
    }

    @GetMapping("/isReady")
    fun isReady(): ResponseEntity<Any> {
        return ResponseEntity(HttpStatus.OK)
    }
}