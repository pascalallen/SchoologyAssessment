<?php

declare(strict_types=1);

namespace Tests\Unit\App\Http\Controllers\API;

use App\Http\Controllers\API\UserSearchController;
use App\Models\User;
use App\Repositories\UserRepositoryInterface;
use Generator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Log\Logger;
use Mockery\MockInterface;
use Symfony\Component\HttpFoundation\Request;
use Tests\TestCase;

/**
 * @covers \App\Http\Controllers\API\UserSearchController
 */
class UserSearchControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @var UserSearchController */
    protected $controller;
    /** @var UserRepositoryInterface|MockInterface */
    protected $mockUserRepository;
    /** @var Logger|MockInterface */
    protected $mockLogger;

    public function setUp(): void
    {
        parent::setUp();
        $this->mockUserRepository = $this->mock(UserRepositoryInterface::class);
        $this->mockLogger = $this->mock(Logger::class);
        $this->controller = new UserSearchController(
            $this->mockUserRepository,
            $this->mockLogger
        );
    }

    public function test_that_handle_returns_expected_search_results()
    {
        /** @var User $user */
        $user = User::factory()->create([
            'name' => 'Pascal Allen'
        ]);

        $searchTerm = 'Allen';

        $request = new FormRequest();
        $request->setMethod(Request::METHOD_GET);
        $request->replace([
            'search_term' => $searchTerm
        ]);

        $this->mockUserRepository
            ->shouldReceive('streamAll')
            ->once()
            ->withArgs(function (string $searchTermArg) use ($searchTerm, $user) {
                return $searchTerm === $searchTermArg
                    && str_contains($user->name, $searchTermArg);
            })
            ->andReturn($this->arrayAsGenerator([$user]));

        $this->mockLogger
            ->shouldReceive('info')
            ->once()
            ->withArgs(function (string $message, array $context) {
                return is_string($message) && is_array($context);
            })
            ->andReturnNull();

        $response = $this->controller->handle($request);

        static::assertTrue(
            $response->isSuccessful()
            && !empty($response->getData())
        );
    }

    /**
     * @return Generator|[]
     */
    private function arrayAsGenerator(array $array): Generator
    {
        foreach ($array as $item) {
            yield $item;
        }
    }
}
